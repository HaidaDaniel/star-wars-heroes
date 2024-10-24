import { Edge, Node } from "@xyflow/react";
import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";

export const generateNodes = (name: string, films: Film[], starships: Starship[]): Node[] => {
    const widthNode = 200;
    const paddingNode = 0;
    const xWidth = widthNode + paddingNode;
    const stylesNode = {
      width: widthNode,
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const heroNode = {
      id: "hero",
      data: { label: name },
      position: { x: ( widthNode) / 2, y: 5 },
      style: stylesNode,
    };
  
    const filmNodes = films.map((film, idx) => ({
      id: `film-${idx}`,
      data: { label: film.title },
      position: { x: xWidth * idx, y: 100 },
      style: stylesNode,
    }));
  
    const starshipNodes = starships.map((ship, idx) => ({
      id: `ship-${idx}`,
      data: { label: ship.name },
      position: { x: xWidth * idx, y: 200 },
      style: stylesNode,
    }));
    return [heroNode, ...filmNodes, ...starshipNodes];
  };  
  export const generateEdges = (films: Film[], starships: Starship[]): Edge[] => {
    const filmEdges = films.map((_, idx) => ({
      id: `e-hero-film-${idx}`,
      source: "hero",
      target: `film-${idx}`,
    }));
  
    const shipEdges: Edge[] = [];
    starships.forEach((ship, shipIdx) => {
      ship.films.forEach((filmId: number) => {
        const filmIdx = films.findIndex((film) => {
          return film.id === filmId;
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

    return [...filmEdges, ...shipEdges];
  };