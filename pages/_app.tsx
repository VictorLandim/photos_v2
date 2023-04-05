import type { AppProps } from "next/app";
import { Fragment_Mono } from "next/font/google";
import "photoswipe/dist/photoswipe.css";
import MobileLayoutProvider from "../contexts/MobileLayoutContext";
import "../styles/index.css";

const fragmentMono = Fragment_Mono({ subsets: ["latin"], weight: ["400"] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>{`
      html {
        font-family: ${fragmentMono.style.fontFamily};
      }
    `}</style>
    <MobileLayoutProvider>
      <Component {...pageProps} />
    </MobileLayoutProvider>
  </>
);

export default App;
