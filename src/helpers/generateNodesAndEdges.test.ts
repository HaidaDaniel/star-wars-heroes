import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";
import { generateEdges, generateNodes } from "./FlowParamGeneration";

describe("Node and Edge Generation", () => {
  const mockFilms = [
    { id: 1, title: "A New Hope" },
    { id: 2, title: "The Empire Strikes Back" },
    { id: 3, title: "Return of the Jedi" },
  ] as Film[];

  const mockStarships = [
      { name: "X-wing", films: [1, 2] },
      { name: "TIE Fighter", films: [1] },
  ] as unknown as Starship[];

  describe("generateNodes", () => {
    it("should generate the correct nodes for a hero, films, and starships", () => {
      const nodes = generateNodes("Luke Skywalker", mockFilms, mockStarships);

      expect(nodes).toHaveLength(6);

      expect(nodes[0]).toEqual({
        id: "hero",
        data: { label: "Luke Skywalker" },
        position: { x: 100, y: 5 },
        style: expect.any(Object),
      });

      mockFilms.forEach((film, idx) => {
        expect(nodes[idx + 1]).toEqual({
          id: `film-${idx}`,
          data: { label: film.title },
          position: { x: 200 * idx, y: 100 },
          style: expect.any(Object),
        });
      });

      mockStarships.forEach((ship, idx) => {
        expect(nodes[mockFilms.length + idx + 1]).toEqual({
          id: `ship-${idx}`,
          data: { label: ship.name },
          position: { x: 200 * idx, y: 200 },
          style: expect.any(Object),
        });
      });
    });
  });

  describe("generateEdges", () => {
    it("should generate the correct edges between hero, films, and starships", () => {
      const edges = generateEdges(mockFilms, mockStarships);

      expect(edges).toHaveLength(6);

      mockFilms.forEach((_, idx) => {
        expect(edges[idx]).toEqual({
          id: `e-hero-film-${idx}`,
          source: "hero",
          target: `film-${idx}`,
        });
      });

      const shipEdges = [
        { id: "e-film-ship-0-0", source: "film-0", target: "ship-0" },
        { id: "e-film-ship-0-1", source: "film-1", target: "ship-0" },
        { id: "e-film-ship-1-0", source: "film-0", target: "ship-1" },
      ];

      expect(edges.slice(mockFilms.length)).toEqual(shipEdges);
    });
  });
});
