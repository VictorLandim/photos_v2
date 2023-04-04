import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import AlbumHeading from "../components/AlbumHeading";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import getAlbumNames from "../utils/getAlbumNames";
import getCloudinaryImages from "../utils/getCloudinaryImages";
import imagesToGalleryImages from "../utils/imagesToGalleryImages";
import meta from "../utils/meta";
import type { PageProps } from "../utils/types";

const AlbumDetailPage: NextPage = (props: PageProps) => {
  const { images } = props;
  const router = useRouter();
  const { albumSlug } = router.query;

  return (
    <>
      <Head>
        <title>{`${albumSlug} | ${meta.title}`}</title>
        {/* <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        /> */}
      </Head>
      <Layout>
        {albumSlug && <AlbumHeading heading={albumSlug as string} />}
        <Gallery photos={images} />
      </Layout>
    </>
  );
};

export default AlbumDetailPage;

export async function getStaticProps({ params: { albumSlug } }) {
  const images = await getCloudinaryImages(albumSlug);
  const galleryImages = imagesToGalleryImages(images);

  return {
    props: {
      images: galleryImages,
    },
  };
}

export async function getStaticPaths() {
  const albumNames = await getAlbumNames();
  const paths = albumNames.map((album) => ({ params: { albumSlug: album } }));

  return {
    paths,
    fallback: false,
  };
}
