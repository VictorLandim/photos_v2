import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Container = ({ children }: LayoutProps) => (
  <main className="ui-sm:p-6 ui-mx-auto ui-flex ui-w-full ui-max-w-[1400px] ui-flex-1 ui-justify-between ui-p-[12px]">
    {children}
  </main>
);
