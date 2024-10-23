import React, { createContext, ReactNode } from "react";
import { StarWarsData } from "../types/Data";

const defaultData: StarWarsData = {
  films: {},
};

export const AppContext = createContext<StarWarsData>(defaultData);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AppContext.Provider value={defaultData}>{children}</AppContext.Provider>;
};