import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import getOrderIdFromPublicId from "../utils/getOrderIdFromPublicId";
import { meta } from "../utils/meta";
import sortImagesById from "../utils/sortImagesbyId";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {/*
          TODO
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        /> */}
      </Head>
      <Header />
      <main className="mx-auto max-w-[1960px] p-6">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative flex w-full cursor-pointer items-center after:pointer-events-none after:absolute after:inset-0 after:rounded-sm after:shadow-highlight"
            >
              <Image
                alt="Photo"
                className="transform rounded-sm brightness-100 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .max_results(400)
    .execute();

  const reducedPromises: Promise<ImageProps>[] = results.resources.map(
    async (image: ImageProps) => ({
      id: getOrderIdFromPublicId(image.public_id),
      blurDataUrl: await getBase64ImageUrl(image),
      height: image.height,
      width: image.width,
      public_id: image.public_id,
      format: image.format,
    })
  );

  const reducedResults = (await Promise.all(reducedPromises)).sort(
    sortImagesById
  );

  return {
    props: {
      images: reducedResults,
    },
  };
}
