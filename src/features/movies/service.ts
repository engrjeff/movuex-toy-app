import {
  apiClient,
  getBackdropPath,
  getPosterPath,
  PaginatedResult,
} from "@/lib/api";
import { Genre, Movie, MovieDetail } from "./types";

export const getMovies = async (
  page: string = "1",
  genres: string = ""
): Promise<PaginatedResult<Movie>> => {
  const url = genres
    ? `/discover/movie?page=${page}&sort_by=popularity.desc&include_adult=false&with_genres=${genres}`
    : `movie/popular?page=${page}`;

  const response = await apiClient.get<PaginatedResult<Movie>>(url);

  return {
    ...response.data,
    results: response.data.results.map((m) => ({
      ...m,
      poster_path: getPosterPath(m.poster_path),
    })),
  };
};

export const getMovieById = async (id: string): Promise<MovieDetail | null> => {
  try {
    const response = await apiClient.get<MovieDetail>(
      `movie/${id}?append_to_response=credits,keywords,videos`
    );

    return {
      ...response.data,
      poster_path: getPosterPath(response.data.poster_path),
      backdrop_path: getBackdropPath(response.data.backdrop_path),
      credits: {
        cast: response.data.credits.cast.slice(0, 12).map((c) => ({
          ...c,
          profile_path: getPosterPath(c.profile_path),
        })),
      },
      videos: {
        results: response.data.videos.results
          .filter((v) => v.site === "YouTube" && v.type === "Trailer")
          .slice(0, 1),
      },
    };
  } catch (error) {
    return null;
  }
};

export const searchMovies = async (
  page: string = "1",
  keyword: string
): Promise<PaginatedResult<Movie>> => {
  const response = await apiClient.get<PaginatedResult<Movie>>(
    `search/movie?query=${keyword}&page=${page}&include_adult=false`
  );

  return {
    ...response.data,
    results: response.data.results.map((m) => ({
      ...m,
      poster_path: getPosterPath(m.poster_path),
    })),
  };
};

export const getMovieGenres = async () => {
  const response = await apiClient.get<{ genres: Genre[] }>(
    `/genre/movie/list`
  );

  return response.data.genres;
};
