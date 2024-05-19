"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type GridLayout = "single" | "multiple";

const DEFAULT_GRID_LAYOUT: GridLayout = "single";

type GridLayoutContext = {
  gridLayout: GridLayout;
  setLayout: (layout: GridLayout) => void;
};

const GridLayoutContext = createContext<GridLayoutContext>({
  gridLayout: DEFAULT_GRID_LAYOUT,
  setLayout: () => {},
});

export const GridLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [gridLayout, setGridLayout] = useState<GridLayout>(DEFAULT_GRID_LAYOUT);
  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        setLayout: (layout: GridLayout) => {
          setGridLayout(layout);
        },
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};

export const useGridLayout = () => useContext(GridLayoutContext);
