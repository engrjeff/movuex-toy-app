import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUrl = (url: string) =>
  url.includes('?')
    ? url + '&api_key=2ff83c584bf65d8c0addb56ac7fd3d1f'
    : url + '?api_key=2ff83c584bf65d8c0addb56ac7fd3d1f';

export const getPosterPath = (posterPath: string) =>
  'https://www.themoviedb.org/t/p/w220_and_h330_face/' + posterPath;

export interface PaginatedResult<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
