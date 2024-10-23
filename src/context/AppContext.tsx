import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchStarWarsData } from "../api/api";
import { StarWarsData } from "../types/Data";


const defaultData: StarWarsData = {
  films: {},
};

export const AppContext = createContext<StarWarsData>(defaultData); 

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StarWarsData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchStarWarsData();
      setData(fetchedData);
    };

    loadData();
  }, []);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};