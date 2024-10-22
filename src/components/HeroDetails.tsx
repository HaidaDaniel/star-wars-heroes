import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchHeroDetails, fetchFilmsAndStarships } from "../api/api";
import { Hero } from "../types/Hero.types";
import "./HeroDetails.css";
import { Edge, ReactFlow , Node } from "@xyflow/react";
import '@xyflow/react/dist/base.css';


interface HeroDetailsProps {
  heroUrl: string;
}

export const HeroDetails: React.FC<HeroDetailsProps> = ({ heroUrl }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const {
    data: heroData,
    isLoading,
    isError,
  } = useQuery<Hero, Error>({
    queryKey: ["heroDetails", heroUrl],
    queryFn: () => fetchHeroDetails(heroUrl),
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (heroData) {
        const { name, films, starships } = heroData;

        const widthNode = 200;
        const paddingNode = 0;
        const xWidth = widthNode + paddingNode;

        const heroNode = {
          id: "hero",
          data: { label: name },
          position: { x: 250, y: 5 },
          style: { width: widthNode, height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }
        };

        const { films: filmDetails, starships: starshipDetails } =
          await fetchFilmsAndStarships(films, starships);



        const filmNodes = filmDetails.map((film, idx) => ({
          id: `film-${idx}`,
          data: { label: film.title },
          position: { x: xWidth * idx, y: 100 },
          style: { width: widthNode, height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }
        }));
        const starshipNodes = starshipDetails.map((ship, idx) => ({
          id: `ship-${idx}`,
          data: { label: ship.name },
          position: { x: xWidth * idx, y: 200 },
          style: { width: widthNode, height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }
        }));

        const filmEdges = filmDetails.map((_, idx) => ({
          id: `e-hero-film-${idx}`,
          source: "hero",
          target: `film-${idx}`,
        }));

        const shipEdges = [] as Edge[];
        starshipDetails.forEach((ship, shipIdx) => {
          ship.films.forEach((filmUrl) => {
            const filmIdx = filmDetails.findIndex((film) => {
              return film.id === filmUrl;
            });
            if (filmIdx !== -1) {
              shipEdges.push({
                id: `e-film-ship-${shipIdx}-${filmIdx}`,
                source: `film-${filmIdx}`,
                target: `ship-${shipIdx}`,
              });
            }
          });
        });

        setNodes([heroNode, ...filmNodes, ...starshipNodes]);
        setEdges([...filmEdges, ...shipEdges]);
      }
    };

    fetchDetails();
  }, [heroData]);

  if (isLoading) return <h4>Loading hero details...</h4>;
  if (isError) return <h4>Error loading hero details</h4>;

  return (
    <div className="hero-details">
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};
