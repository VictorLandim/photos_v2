import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-black/95">
    <Header />
    <main className="mx-auto w-full max-w-[1400px] flex-1 p-[12px] sm:p-6">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
