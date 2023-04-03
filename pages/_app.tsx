import type { AppProps } from "next/app";
import { Fragment_Mono } from "next/font/google";
import "photoswipe/dist/photoswipe.css";
import "../styles/index.css";

const fragmentMono = Fragment_Mono({ subsets: ["latin"], weight: ["400"] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>{`
      html {
        font-family: ${fragmentMono.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </>
);

export default App;
