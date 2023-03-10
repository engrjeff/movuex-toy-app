import { ParsedUrlQuery } from "querystring";

export interface Movie {
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  id: number;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface MovieCast {
  name: string;
  id: number;
  character: string;
  profile_path: string;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  homepage: string;
  runtime: number;
  backdrop_path: string;
  credits: {
    cast: MovieCast[];
  };
  keywords: {
    keywords: Keyword[];
  };
  videos: {
    results: Video[];
  };
}

export interface GetMoviesUrlQuery extends ParsedUrlQuery {
  page?: string;
  genres?: string;
  year?: string;
  country?: string;
  sortBy?: string;
}
