import axios from "axios";
import {
  fetchHeroesPage,
  fetchHeroDetails,
  fetchFilmDetails,
  fetchStarshipDetails,
  fetchFilmsAndStarships,
  fetchWithLimit,
} from "./api";
import { Film } from "../types/Film.type";
import { Starship } from "../types/Starship.type";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch heroes page data", async () => {
    const mockData = { results: [{ name: "Luke Skywalker" }] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchHeroesPage(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/people?page=1"
    );
    expect(data).toEqual(mockData);
  });

  it("should fetch hero details", async () => {
    const mockData = { name: "Luke Skywalker" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchHeroDetails("https://sw-api.starnavi.io/people/1");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/people/1"
    );
    expect(data).toEqual(mockData);
  });

  it("should fetch film details", async () => {
    const mockData = { id: 1, title: "A New Hope" } as Film;
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchFilmDetails(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/films/1/"
    );
    expect(data).toEqual(mockData);
  });

  it("should throw an error if fetching film details fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch film details"));

    await expect(fetchFilmDetails(1)).rejects.toThrow(
      "Failed to fetch film details"
    );
  });

  it("should fetch starship details", async () => {
    const mockData  = { id: 1, name: "X-wing" } as unknown as Starship;
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchStarshipDetails(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/starships/1/"
    );
    expect(data).toEqual(mockData);
  });

  it("should throw an error if fetching starship details fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch starship details"));

    await expect(fetchStarshipDetails(1)).rejects.toThrow(
      "Failed to fetch starship details"
    );
  });

  it("should fetch films and starships concurrently with limits", async () => {
    const mockFilmData = { id: 1, title: "A New Hope" } as Film;
    const mockStarshipData = { id: 1, name: "X-wing" } as unknown as Starship;

    mockedAxios.get
      .mockResolvedValueOnce({ data: mockFilmData })
      .mockResolvedValueOnce({ data: mockStarshipData });

    const { films, starships } = await fetchFilmsAndStarships([1], [1]);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/films/1/"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://sw-api.starnavi.io/starships/1/"
    );
    expect(films).toEqual([mockFilmData]);
    expect(starships).toEqual([mockStarshipData]);
  });

  it("should handle fetchWithLimit correctly", async () => {
    const mockData = { id: 1, title: "A New Hope" };
    const fetchFn = jest.fn().mockResolvedValue(mockData);

    const results = await fetchWithLimit([1, 2], fetchFn);

    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(results).toEqual([mockData, mockData]);
  });
});
