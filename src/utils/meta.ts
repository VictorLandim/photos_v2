import { Metadata } from "next";

const title = "victor.photos";
const description = "collection of my favorite pictures";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
const meta: Metadata = {
  title,
  description,
  generator: "Next.js",
  applicationName: title,
  category: "photography",
  keywords: [
    "Victor",
    "Photos",
    "React",
    "JavaScript",
    "Gallery",
    "Portfolio",
    "Ideas",
    "Inspiration",
    "Nomad",
    "Travel",
    "Film",
    "Fujifilm",
    "Kodak",
    "Photography",
    "Technology",
    "World",
    "Airplane",
    "Explore",
  ],
  authors: [{ name: "Victor Landim", url: "https://victorlandim.com" }],
  colorScheme: "dark",
  creator: "Victor Landim",
  publisher: "Victor Landim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: "#000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: title,
    title: title,
    description,
    type: "article",
    authors: ["Victor Landim"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default meta;
