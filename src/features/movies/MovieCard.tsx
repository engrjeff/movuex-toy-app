import Image from "next/image";
import { Box, Chip, Typography } from "@mui/material";
import { Movie } from "./types";
import AppLink from "@/components/AppLink";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <AppLink href={`/movies/${movie.id}`}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 220,
            sm: 330,
          },
        }}
      >
        <Image
          src={movie.poster_path}
          alt={movie.title}
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
          sizes='(max-width: 600px) 220px,
              (max-width: 1200px) 330px'
        />
      </Box>
      <Typography
        mt={2}
        component='h3'
        fontSize={13}
        fontWeight={600}
        textTransform='capitalize'
      >
        {movie.title}
      </Typography>
    </AppLink>
  );
};

export default MovieCard;
