import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import AlbumTitle from "../components/AlbumTitle";
import Layout from "../components/Layout";
import getAlbumNames from "../utils/getAlbumNames";
import meta from "../utils/meta";
import type { PageProps } from "../utils/types";

type AlbumsPageProps = PageProps & {
  albums: string[];
};

const Albums: NextPage = (props: AlbumsPageProps) => {
  const { albums } = props;

  return (
    <>
      <Head>
        <title>{`albums | ${meta.title}`}</title>
        {/* <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        /> */}
      </Head>
      <Layout>
        <ul>
          {albums.map((album) => (
            <li className="mb-4">
              <Link href={`/${album}`}>
                <AlbumTitle name={album} isFilm />
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default Albums;

export async function getStaticProps() {
  const albumNames = await getAlbumNames();

  return {
    props: {
      albums: albumNames,
    },
  };
}
