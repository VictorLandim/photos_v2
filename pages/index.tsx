import type { NextPage } from "next";
import Head from "next/head";
import Gallery from "../components/Gallery";
import Film from "../components/icons/Film";
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
        {latestAlbum && (
          <p className="mb-4 flex items-center gap-2 text-xs text-white/60">
            <Film />
            Latest album: {latestAlbum}
          </p>
        )}
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
