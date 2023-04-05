import type { NextPage } from "next";
import Head from "next/head";
import AlbumHeading from "../components/AlbumHeading";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import cloudinary from "../utils/cloudinary";
import getCloudinaryImages from "../utils/getCloudinaryImages";
import imagesToGalleryImages from "../utils/imagesToGalleryImages";
import meta from "../utils/meta";
import type { PageProps } from "../utils/types";

type HomePageProps = PageProps & {
  latestAlbum?: string;
};

const HomePage: NextPage = (props: HomePageProps) => {
  const { images, latestAlbum } = props;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {/* <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        /> */}
      </Head>
      <Layout>
        {latestAlbum && <AlbumHeading heading={`Latest: ${latestAlbum}`} />}
        <Gallery photos={images} />
      </Layout>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const foldersResult = await cloudinary.v2.api.sub_folders(
    process.env.CLOUDINARY_FOLDER
  );

  const folders = foldersResult?.folders ?? [];
  const lastIndex = folders.length - 1;

  const latestFolder = folders[lastIndex]?.name;

  const images = await getCloudinaryImages(latestFolder);

  const galleryImages = imagesToGalleryImages(images);

  return {
    props: {
      images: galleryImages,
      latestAlbum: latestFolder,
    },
  };
}
