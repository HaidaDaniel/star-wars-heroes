import axios from "axios";
import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";
import { Vehicle } from "../types/Vehicle.type";
import { Species } from "../types/Specie.type";
import { Planet } from "../types/Planet.type";
import { StarWarsData } from "../types/Data";

const API_BASE = "https://sw-api.starnavi.io";

export const fetchHeroesPage = async (page: number) => {
  const response = await axios.get(`${API_BASE}/people?page=${page}`);
  return response.data;
};

export const fetchHeroDetails = async (heroUrl: string) => {
  const response = await axios.get(`${heroUrl}`);
  return response.data;
};

export const fetchFilmDetails = async (filmId: number): Promise<Film> => {
  const response = await axios.get(`${API_BASE}/films/${filmId}/`);
  if (!response) {
    throw new Error("Failed to fetch film details");
  }
  return response.data;
};

export const fetchStarshipDetails = async (
  starshipId: number
): Promise<Starship> => {
  const response = await axios.get(`${API_BASE}/starships/${starshipId}/`);
  if (!response) {
    throw new Error("Failed to fetch starship details");
  }
  return response.data;
};

const MAX_PARALLEL_REQUESTS = 2;

export const fetchWithLimit = async <T>(
  ids: number[],
  fetchFn: (id: number) => Promise<T>
): Promise<T[]> => {
  const results: T[] = [];
  let currentIndex = 0;

  const fetchNext = async (): Promise<void> => {
    if (currentIndex >= ids.length) return;
    const id = ids[currentIndex];
    currentIndex++;
    try {
      const result = await fetchFn(id);
      results.push(result);
    } catch (error) {
      console.error(`Error fetching ${id}:`, error);
    } finally {
      await fetchNext();
    }
  };

  const initialFetches = Array.from(
    { length: Math.min(MAX_PARALLEL_REQUESTS, ids.length) },
    fetchNext
  );
  await Promise.all(initialFetches);

  return results;
};

export const fetchFilmsAndStarships = async (
  filmIds: number[],
  starshipIds: number[]
) => {
  try {
    const films = await fetchWithLimit(filmIds, fetchFilmDetails);
    const starships = await fetchWithLimit(starshipIds, fetchStarshipDetails);

    return { films, starships };
  } catch (error) {
    console.error("Error fetching films or starships:", error);
    throw error;
  }
};

export const fetchStarWarsData = async (): Promise<StarWarsData> => {
  try {
    const [filmsRes,] =
      await Promise.all([
        axios.get("https://sw-api.starnavi.io/films/"),
   
      ]);

    const [films] = [
      filmsRes.data.results,
   
    ];
    return {
      films: films.reduce((acc: Record<string, Film>, film: Film) => {
        acc[film.id] = film;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error("Failed to fetch StarWarsData", error);
    return {
      films: {},
    };
  }
};
