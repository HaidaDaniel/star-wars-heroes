import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilmsAndStarships, IFetchFilmsAndStarships } from "../api/api";
import { Hero } from "../types/Hero.types";
import { generateEdges, generateNodes } from "../helpers/FlowParamGeneration";
import { Edge, ReactFlow, Node } from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import "./HeroDetails.css";

interface HeroDetailsProps {
  heroDetails: Hero;
}

export const HeroDetails: React.FC<HeroDetailsProps> = ({ heroDetails }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { name, films, starships } = heroDetails;

  const {
    data: filmsAndStarshipsData,
    isLoading,
    isError,
  } = useQuery<IFetchFilmsAndStarships>({
    queryKey: ["filmsAndStarships", films || [], starships || []],
    queryFn: () => fetchFilmsAndStarships(films, starships),
  });

  useEffect(() => {
    if (filmsAndStarshipsData) {
      const { films: filmDetails, starships: starshipDetails } =
        filmsAndStarshipsData;
      const nodes = generateNodes(name, filmDetails, starshipDetails);
      const edges = generateEdges(filmDetails, starshipDetails);

      setNodes(nodes);
      setEdges(edges);
   
    }
  }, [filmsAndStarshipsData, name]);

  if (isLoading) return <h4>Loading hero details...</h4>;
  if (isError) return <h4>Error fetching hero details</h4>;

  return (
    <div className="hero-details">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};
