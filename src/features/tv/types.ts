export interface TvShow {
  name: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  id: number;
  first_air_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TvShowDetail extends TvShow {
  genres: Genre[];
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number;
  homepage: string;
}
