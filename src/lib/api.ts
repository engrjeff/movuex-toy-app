import axios from 'axios';

export const API_URL = process.env.API_URL;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getPosterPath = (posterPath: string) =>
  'https://www.themoviedb.org/t/p/w300_and_h450_face' + posterPath;

export const getBackdropPath = (backdropPath: string) =>
  'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces' + backdropPath;

export interface PaginatedResult<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
