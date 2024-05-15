import { SunnyShotBanner } from "@/components/SunnyShotBanner";
import MobileLayoutProvider from "@/contexts/MobileLayoutContext";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import "photoswipe/dist/photoswipe.css";
import "../styles/globals.css";
// include styles from the ui package

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`dark bg-black antialiased ${font.className}`}>
      <body>
        <MobileLayoutProvider>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-black dark:via-neutral-900 dark:to-black">
            <main className="min-h-full">{children}</main>
            <SunnyShotBanner />
          </div>
        </MobileLayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
