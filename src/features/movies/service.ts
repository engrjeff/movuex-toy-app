import { apiClient, createUrl, getPosterPath, PaginatedResult } from '@/lib/api';
import { Movie, MovieDetail } from './types';

export const getMovies = async (page: string = '1'): Promise<PaginatedResult<Movie>> => {
  const url = createUrl(`movie/now_playing?page=${page}`);
  const response = await apiClient.get<PaginatedResult<Movie>>(url);

  return {
    ...response.data,
    results: response.data.results.map((m) => ({
      ...m,
      poster_path: getPosterPath(m.poster_path),
    })),
  };
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const url = createUrl(`movie/${id}`);
  const response = await apiClient.get<MovieDetail>(url);

  return {
    ...response.data,
    poster_path: getPosterPath(response.data.poster_path),
  };
};
