import { createContext, ReactNode, useContext, useState } from "react";

type MobileLayout = "single" | "multiple";

const DEFAULT_MOBILE_LAYOUT: MobileLayout = "single";

type MobileLayoutContextType = {
  mobileLayout: MobileLayout;
  toggle: () => void;
};

const MobileLayoutContext = createContext<MobileLayoutContextType>({
  mobileLayout: DEFAULT_MOBILE_LAYOUT,
  toggle: () => {},
});

const MobileLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [mobileLayout, setMobileLayout] = useState<MobileLayout>(
    DEFAULT_MOBILE_LAYOUT
  );
  const toggle = () => {
    setMobileLayout(mobileLayout === "multiple" ? "single" : "multiple");
  };

  return (
    <MobileLayoutContext.Provider
      value={{
        mobileLayout,
        toggle,
      }}
    >
      {children}
    </MobileLayoutContext.Provider>
  );
};

export default MobileLayoutProvider;

export const useMobileLayout = () => useContext(MobileLayoutContext);
