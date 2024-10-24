import { render, screen, fireEvent } from "@testing-library/react";
import { HeroesList } from "./HeroesList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver
jest.mock("../api/api");

jest.mock("../api/api", () => ({
  fetchHeroesPage: jest.fn(),
  fetchHeroDetails: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
  useQuery: jest.fn(),
}));

describe("HeroesList", () => {
  const mockHeroes = [
    {
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
        starships: [2],
        vehicles: [1],
        created:"2014-12-10T16:16:29.192000Z",
        edited: "2014-12-20T21:17:50.325000Z",
      },
      {
        id: 1,
        url: "https://swapi.dev/api/people/2/",
        name: "Luke Skywalker1",
        birth_year: "19BBY",
        eye_color: "Blue",
        gender: "Male",
        hair_color: "Blond",
        height: "172",
        mass: "77",
        skin_color: "Fair",
        homeworld: 1,
        films: [1],
        species: [1],
        starships: [2],
        vehicles: [1],
        created:"2014-12-10T16:16:29.192000Z",
        edited: "2014-12-20T21:17:50.325000Z",
      },
  ];

  const heroData={
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
    starships: [2],
    vehicles: [1],
    created:"2014-12-10T16:16:29.192000Z",
    edited: "2014-12-20T21:17:50.325000Z",
  }

  const mockStarship = { id: 1, name: "X-wing", model: "T-65 X-wing starfighter" };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: true,
      isFetching: false,
    });


    (useQuery as jest.Mock).mockReturnValue({
      data: undefined, 
      isLoading: true, 
      isError: false,
    });
    render(<HeroesList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a list of heroes", async () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [{ results: mockHeroes, next: null }],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isLoading: false,
      isFetching: false,
    });

    render(<HeroesList />);

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker1")).toBeInTheDocument();
  });

//   it("opens modal and fetches hero details", async () => {
//     (useInfiniteQuery as jest.Mock).mockReturnValue({
//       data: {
//         pages: [{ results: mockHeroes, next: null }],
//       },
//       fetchNextPage: jest.fn(),
//       hasNextPage: false,
//       isLoading: false,
//       isFetching: false,
//     });

//     (useQuery as jest.Mock).mockReturnValue({
//       data: heroData,
//       isLoading: false,
//       isError: false,
//     });
//     (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
//         const [queryType, id] = queryKey;
    
    
//         if (queryType === "starshipDetails" && id === 1) {
//           return {
//             data: mockStarship,
//             isLoading: false,
//             isError: false,
//           };
//         }

//         if
    
//         return { data: undefined, isLoading: true, isError: false };
//       });

//     render(<HeroesList />);

//     fireEvent.click(screen.getByText("Luke Skywalker"));

//     expect(screen.getByText("Hero Details")).toBeInTheDocument();
//     expect(useQuery).toHaveBeenCalledWith(["heroDetails", 1]);
//   });

//   it("handles errors when fetching hero details", async () => {
//     (useInfiniteQuery as jest.Mock).mockReturnValue({
//       data: {
//         pages: [{ results: mockHeroes, next: null }],
//       },
//       fetchNextPage: jest.fn(),
//       hasNextPage: false,
//       isLoading: false,
//       isFetching: false,
//     });

//     (useQuery as jest.Mock).mockReturnValue({
//       data: null,
//       isLoading: false,
//       isError: true,
//     });

//     render(<HeroesList />);


//     fireEvent.click(screen.getByText("Luke Skywalker"));

//     expect(screen.getByText("Error fetching hero details")).toBeInTheDocument();
//   });

//   it("closes the modal", async () => {
//     (useInfiniteQuery as jest.Mock).mockReturnValue({
//       data: {
//         pages: [{ results: mockHeroes, next: null }],
//       },
//       fetchNextPage: jest.fn(),
//       hasNextPage: false,
//       isLoading: false,
//       isFetching: false,
//     });

//     render(<HeroesList />);

//     fireEvent.click(screen.getByText("Luke Skywalker"));

//     fireEvent.click(screen.getByRole("button", { name: /close/i }));

//     await waitFor(() => {
//       expect(screen.queryByText("Hero Details")).not.toBeInTheDocument();
//     });
  });
// });