import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { HeroDetails } from "./HeroDetails";
import { generateEdges, generateNodes } from "../helpers/FlowParamGeneration";
import { Hero } from "../types/Hero.types";
import ResizeObserver from "resize-observer-polyfill";
import { IFetchFilmsAndStarships } from "../api/api";
import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";

global.ResizeObserver = ResizeObserver;
jest.mock("../api/api");

jest.mock("../api/api", () => ({
  fetchFilmsAndStarships: jest.fn(),
}));

jest.mock("../helpers/FlowParamGeneration", () => ({
  generateEdges: jest.fn(),
  generateNodes: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("HeroDetails", () => {
  const mockFilms = [
    { id: 1, title: "A New Hope", starships: [1] },
    { id: 2, title: "The Empire Strikes Back", starships: [2] },
    { id: 3, title: "Return of the Jedi" },
  ] as unknown as Film[];

  const mockStarships = [
    { id: 1, name: "X-wing", films: [1, 2] },
    { id: 2, name: "TIE Fighter", films: [1] },
  ] as unknown as Starship[];
  const heroData = {
    id: 1,
    url: "https://swapi.dev/api/people/1/",
    name: "Luke Skywalker",
    birth_year: "19BBY",
    eye_color: "Blue",
    gender: "Male",
    hair_color: "Blond",
    height: "172",
    mass: "77",
    skin_color: "Fair",
    homeworld: 1,
    films: [1, 2, 3],
    species: [1],
    starships: [1, 2],
    vehicles: [1],
    created: "2014-12-10T16:16:29.192000Z",
    edited: "2014-12-20T21:17:50.325000Z",
  };

  const mockNodes = [
    {
      id: 'hero',
      data: { label: 'Luke Skywalker' },
      position: { x: 100, y: 5 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      id: 'film-0',
      data: { label: 'A New Hope' },
      position: { x: 0, y: 100 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      id: 'film-1',
      data: { label: 'The Empire Strikes Back' },
      position: { x: 200, y: 100 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      id: 'film-2',
      data: { label: 'Return of the Jedi' },
      position: { x: 400, y: 100 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      id: 'ship-0',
      data: { label: 'X-wing' },
      position: { x: 0, y: 200 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      id: 'ship-1',
      data: { label: 'TIE Fighter' },
      position: { x: 200, y: 200 },
      style: {
        width: 200,
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  ];

  const mockEdges = [
    { id: 'e-hero-film-0', source: 'hero', target: 'film-0' },
    { id: 'e-hero-film-1', source: 'hero', target: 'film-1' },
    { id: 'e-hero-film-2', source: 'hero', target: 'film-2' },
    { id: 'e-film-ship-0-0', source: 'film-0', target: 'ship-0' },
    { id: 'e-film-ship-0-1', source: 'film-1', target: 'ship-0' },
    { id: 'e-film-ship-1-0', source: 'film-0', target: 'ship-1' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<HeroDetails heroDetails={heroData} />);
    expect(screen.getByText("Loading hero details...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<HeroDetails heroDetails={heroData} />);
    expect(screen.getByText("Error fetching hero details")).toBeInTheDocument();
  });

  it("renders hero details with nodes and edges",  () => {
    const mockFilmsAndStarshipsData = {
      films: mockFilms,
      starships: mockStarships,
    } as unknown as IFetchFilmsAndStarships;

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockFilmsAndStarshipsData,
    });


    (generateNodes as jest.Mock).mockReturnValue(mockNodes);
    (generateEdges as jest.Mock).mockReturnValue(mockEdges);

    render(<HeroDetails heroDetails={heroData} />);

    expect(
      screen.queryByText("Loading hero details...")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Error fetching hero details")
    ).not.toBeInTheDocument();
    expect(generateNodes).toHaveBeenCalledWith(
      heroData.name,
      mockFilmsAndStarshipsData.films,
      mockFilmsAndStarshipsData.starships
    );
    expect(generateEdges).toHaveBeenCalledWith(
      mockFilmsAndStarshipsData.films,
      mockFilmsAndStarshipsData.starships
    );
   
      expect(screen.getByText("X-wing")).toBeInTheDocument();
   
    
  });});
