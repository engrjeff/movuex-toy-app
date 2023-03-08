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
}
