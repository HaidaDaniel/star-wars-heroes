import React from "react";

import { HeroesList } from "./components/HeroesList";
import { useQuery } from "@tanstack/react-query";
import { fetchStarWarsData } from "./api/api";
import { AppContext } from "./context/AppContext";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["starWarsData"],
    queryFn: fetchStarWarsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>No data available</div>;
  return (
    <AppContext.Provider value={data}>
      <div className="App" data-testid="app-component">
        <HeroesList />
      </div>
    </AppContext.Provider>
  );
}
export default App;
