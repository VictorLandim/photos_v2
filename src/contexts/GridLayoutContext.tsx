"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type GridLayout = "single" | "multiple";

type GridLayoutContext = {
  gridLayout: GridLayout;
  setLayout: (layout: GridLayout) => void;
  isMobile: boolean;
};

const GridLayoutContext = createContext<GridLayoutContext>({
  gridLayout: "multiple",
  setLayout: () => {},
  isMobile: false,
});

export const GridLayoutProvider = ({
  children,
  isMobile,
}: {
  children: ReactNode;
  isMobile?: boolean;
}) => {
  const [gridLayout, setGridLayout] = useState<GridLayout>(
    isMobile ? "multiple" : "single"
  );
  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        setLayout: (layout: GridLayout) => {
          setGridLayout(layout);
        },
        isMobile,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export const useGridLayout = () => useContext(GridLayoutContext);
