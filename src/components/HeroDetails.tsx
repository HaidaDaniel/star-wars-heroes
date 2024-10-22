import { useEffect, useState } from "react";
import ReactFlow, { Node, Edge } from "react-flow-renderer";
import { useQuery } from "@tanstack/react-query";
import { fetchHeroDetails, fetchFilmsAndStarships } from "../api/api";
import { Hero } from "../types/Hero.types";
import "./HeroDetails.css";

interface HeroDetailsProps {
  heroUrl: string;
}

export const HeroDetails: React.FC<HeroDetailsProps> = ({ heroUrl }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { data: heroData, isLoading, isError } = useQuery<Hero, Error>({
    queryKey: ["heroDetails", heroUrl],
    queryFn: () => fetchHeroDetails(heroUrl),
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (heroData) {
        const { name, films, starships } = heroData;
        
        const heroNode = {
          id: "hero",
          data: { label: name },
          position: { x: 250, y: 5 },
        };

        const { films: filmDetails, starships: starshipDetails } = await fetchFilmsAndStarships(films, starships);
        console.log(heroData ,filmDetails , starshipDetails );

        const filmNodes = filmDetails.map((film, idx) => ({
          id: `film-${idx}`,
          data: { label: film.title },
          position: { x: 100 * idx, y: 100 },
        }));
        const starshipNodes = starshipDetails.map((ship, idx) => ({
          id: `ship-${idx}`,
          data: { label: ship.name },
          position: { x: 100 * idx, y: 200 },
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
                   return film.id === filmUrl});
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