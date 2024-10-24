import axios, { AxiosResponse } from "axios";
import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";
import { StarWarsData } from "../types/Data";
import { Hero, HeroPageResponse } from "../types/Hero.types";

const API_BASE = "https://sw-api.starnavi.io";

type FetchFunction<T> = (id: number) => Promise<T>;
// rename
const baseRequest = async <T>(slug: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(`${API_BASE}/${slug}`);
  return response.data;
};

export const fetchHeroesPage = async (page: number) =>
  baseRequest<HeroPageResponse>(`people?page=${page}`);

export const fetchHeroDetails = async (heroId: number) =>{
 return baseRequest<Hero>(`people/${heroId}`);}

export const fetchFilmDetails = async (filmId: number): Promise<Film> =>
  baseRequest<Film>(`films/${filmId}/`);

export const fetchStarshipDetails = async (
  starshipId: number
): Promise<Starship> => baseRequest<Starship>(`starships/${starshipId}/`);

export const fetchWithLimit = async <T>(
  ids: number[],
  fetchFn: FetchFunction<T>,
  limit = 1
): Promise<T[]> => {
  const results: T[] = [];
  let currentIndex = 0;

  const fetchNext = async (): Promise<void> => {
    if (currentIndex >= ids.length) return;
    const id = ids[currentIndex++];
    try {
      const result = await fetchFn(id);
      results.push(result);
    } catch (error) {
      console.error(`Failed to fetch data for ID: ${id}`, error);
    } finally {
      await fetchNext();
    }
  };

  const initialFetches = Array.from(
    { length: Math.min(limit, ids.length) },
    fetchNext
  );
  await Promise.all(initialFetches);

  return results;
};

export interface IFetchFilmsAndStarships {
  films: Film[];
  starships: Starship[];
}

export const fetchFilmsAndStarships = async (
  filmIds: number[],
  starshipIds: number[]
): Promise<IFetchFilmsAndStarships> => {
  const [films, starships] = await Promise.all([
    fetchWithLimit(filmIds, fetchFilmDetails),
    fetchWithLimit(starshipIds, fetchStarshipDetails),
  ]);

  return { films, starships };
};

export const fetchStarWarsData = async (): Promise<StarWarsData> => {
  const films = await baseRequest<{ results: Film[] }>(`films/`);

  return {
    films: films.results.reduce<Record<string, Film>>((acc, film) => {
      acc[film.id] = film;
      return acc;
    }, {}),
  };
};
