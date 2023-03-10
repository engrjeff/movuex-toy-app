import Box from "@mui/material/Box";
import MovieCard from "./MovieCard";

import type { Movie } from "./types";

function MoviesGrid({ movies }: { movies: Movie[] }) {
  return (
    <Box
      display='grid'
      gridTemplateColumns={{
        xs: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
      }}
      gap={{ xs: 2, sm: 3 }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
}

export default MoviesGrid;
