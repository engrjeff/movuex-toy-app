import { apiClient, createUrl, getPosterPath, PaginatedResult } from '@/lib/api';
import { TvShow, TvShowDetail } from './types';

export const getTvShows = async (page: string = '1'): Promise<PaginatedResult<TvShow>> => {
  const url = createUrl(`tv/popular?page=${page}`);
  const response = await apiClient.get<PaginatedResult<TvShow>>(url);

  return {
    ...response.data,
    results: response.data.results.map((m) => ({
      ...m,
      poster_path: getPosterPath(m.poster_path),
    })),
  };
};

export const getTvShowById = async (id: string): Promise<TvShowDetail> => {
  const url = createUrl(`tv/${id}`);
  const response = await apiClient.get<TvShowDetail>(url);

  return {
    ...response.data,
    poster_path: getPosterPath(response.data.poster_path),
  };
};
