import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import Footer from "../components/Footer";
import Header from "../components/Header";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import getOrderIdFromPublicId from "../utils/getOrderIdFromPublicId";
import meta from "../utils/meta";
import sortImagesById from "../utils/sortImagesbyId";
import type { ImageProps } from "../utils/types";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
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
      <Gallery
        id="test"
        options={
          {
            // showHideAnimationType: "none",
            // zoomAnimationDuration: false,
          }
        }
      >
        <main className="mx-auto max-w-[1960px] p-6">
          <div className="grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {images.map(
              ({ id, public_id, format, blurDataUrl, width, height }) => {
                const aspectRatio = width / height;

                const thumbnailWidth = 720;
                const thumbnailHeight = Math.floor(
                  thumbnailWidth / aspectRatio
                );

                const lightboxHeight = 1500;
                const lightboxWidth = Math.floor(lightboxHeight * aspectRatio);

                const thumbnailSrc = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${thumbnailWidth}/${public_id}.${format}`;

                const lightboxSrc = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${lightboxWidth}/${public_id}.${format}`;

                return (
                  <div className="after:content group relative flex w-full cursor-pointer items-center after:pointer-events-none after:absolute after:inset-0 after:rounded-sm after:shadow-highlight">
                    <Item
                      key={public_id}
                      original={lightboxSrc}
                      thumbnail={thumbnailSrc}
                      width={lightboxWidth}
                      height={lightboxHeight}
                    >
                      {({ ref, open }) => (
                        <Image
                          onClick={open}
                          ref={ref as any}
                          alt="Photo"
                          className="transform cursor-pointer rounded-sm object-cover brightness-100 transition will-change-auto group-hover:brightness-110"
                          style={{ transform: "translate3d(0, 0, 0)" }}
                          placeholder="blur"
                          blurDataURL={blurDataUrl}
                          src={thumbnailSrc}
                          width={thumbnailWidth}
                          height={thumbnailHeight}
                          loading={id <= 8 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw,
                                  (max-width: 1280px) 50vw,
                                  (max-width: 1536px) 33vw,
                                  25vw"
                        />
                      )}
                    </Item>
                  </div>
                );
              }
            )}
          </div>
        </main>
      </Gallery>
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
