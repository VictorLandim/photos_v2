import { SunnyShotBanner } from "@/components/SunnyShotBanner";
import { GridLayoutProvider } from "@/contexts/GridLayoutContext";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { userAgent } from "next/server";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import "photoswipe/dist/photoswipe.css";
import "../styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = userAgent({ headers: headers() }).device.type === "mobile";
  return (
    <html lang="en" className={`dark bg-black antialiased ${font.className}`}>
      <Script
        id="msc"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "mj6pv9arkx");
                `,
        }}
      />
      <body>
        <GridLayoutProvider isMobile={isMobile}>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-black dark:via-neutral-900 dark:to-black">
            <main className="min-h-full">{children}</main>
            <SunnyShotBanner />
          </div>
        </GridLayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
