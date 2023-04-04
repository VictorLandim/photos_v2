import type { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { PhotoAlbum } from "react-photo-album";
import { Gallery, Item } from "react-photoswipe-gallery";
import Footer from "../components/Footer";
import Header from "../components/Header";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import getOrderIdFromPublicId from "../utils/getOrderIdFromPublicId";
import meta from "../utils/meta";
import renderPhoto from "../utils/renderPhoto";
import sortImagesById from "../utils/sortImagesbyId";
import type { GalleryImageProps, ImageProps } from "../utils/types";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const photoAlbumPhotos: GalleryImageProps[] = useMemo(
    () =>
      images.map(({ id, public_id, format, blurDataUrl, width, height }) => ({
        src: `${public_id}.${format}`,
        width,
        height,
        id,
        blurDataUrl,
      })),
    [images]
  );

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
        id="photos"
        options={
          {
            // showHideAnimationType: "none",
            // zoomAnimationDuration: false,
          }
        }
      >
        <main className="mx-auto max-w-[1400px] p-[12px] sm:p-6">
          <PhotoAlbum
            layout="rows"
            photos={photoAlbumPhotos}
            renderPhoto={renderPhoto}
            spacing={12}
            padding={0}
            targetRowHeight={500}
          />
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
