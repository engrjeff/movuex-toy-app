import { apiClient, getBackdropPath, getPosterPath, PaginatedResult } from '@/lib/api';
import { TvShow, TvShowDetail } from './types';

export const getTvShows = async (page: string = '1'): Promise<PaginatedResult<TvShow>> => {
  const response = await apiClient.get<PaginatedResult<TvShow>>(`tv/popular?page=${page}`);

  return {
    ...response.data,
    results: response.data.results.map((m) => ({
      ...m,
      poster_path: getPosterPath(m.poster_path),
    })),
  };
};

export const getTvShowById = async (id: string): Promise<TvShowDetail | null> => {
  try {
    const response = await apiClient.get<TvShowDetail>(`tv/${id}`);

    return {
      ...response.data,
      poster_path: getPosterPath(response.data.poster_path),
      backdrop_path: getBackdropPath(response.data.backdrop_path),
    };
  } catch (error) {
    return null;
  }
};
