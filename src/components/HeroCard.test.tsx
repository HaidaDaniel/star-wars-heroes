import { render, screen } from "@testing-library/react";
import { HeroCard } from "./HeroCard";
import { AppContext } from "../context/AppContext";
import { Hero } from "../types/Hero.types";
import { Film } from "../types/Film.type";

const mockHero: Hero = {
  id: 1,
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
} as Hero;

const mockFilmData = {
    1: { title: "A New Hope" },
    2: { title: "The Empire Strikes Back" },
    3: { title: "Return of the Jedi" },
} as unknown as Record<number, Film>;
const mockFilmDataWithoutTitle = {
    1: {  },
    2: {  },
    3: {  },
} as unknown as Record<number, Film>;

describe("HeroCard", () => {
  it("renders hero details correctly", () => {
    render(
      <AppContext.Provider value={{ films: mockFilmData }}>
        <HeroCard {...mockHero} />
      </AppContext.Provider>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("A New Hope, The Empire Strikes Back, Return of the Jedi")).toBeInTheDocument();
    expect(screen.getByText("10/12/2014")).toBeInTheDocument();
    expect(screen.getByText("20/12/2014")).toBeInTheDocument();
  });
  it("renders hero details correctly when film data is missing title", () => {
    render(
      <AppContext.Provider value={{ films: mockFilmDataWithoutTitle }}>
        <HeroCard {...mockHero} />
      </AppContext.Provider>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("1, 2, 3")).toBeInTheDocument();
    expect(screen.getByText("10/12/2014")).toBeInTheDocument();
    expect(screen.getByText("20/12/2014")).toBeInTheDocument();
  });

  it("displays correct image based on hero id", () => {
    render(
      <AppContext.Provider value={{ films: mockFilmData }}>
        <HeroCard {...mockHero} />
      </AppContext.Provider>
    );

    const img = screen.getByAltText("Luke Skywalker");
    expect(img).toHaveAttribute("src", "https://starwars-visualguide.com/assets/img/characters/1.jpg");
  });
});