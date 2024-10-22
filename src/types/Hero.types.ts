export type Hero = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: number[];
  species: string[];
  starships: number[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

export type HeroWithId = Hero & {
    id: number;
  };

export type HeroPageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroWithId[];
};