import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { Movie } from './types';

interface SearchMovieResultCardProps {
  movie: Movie;
}

function SearchMovieResultCard({ movie }: SearchMovieResultCardProps) {
  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        '&:hover h3': {
          color: 'primary.main',
        },
      }}
    >
      <Box width={150} height={200}>
        <Image
          src={movie.poster_path}
          alt={movie.title}
          width={150}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent>
        <Typography variant='h6' component='h3'>
          {movie.title}
        </Typography>
        <Typography gutterBottom fontSize={13} color='text.secondary'>
          {movie.release_date}
        </Typography>
        <Typography fontSize={14} color='text.secondary'>
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SearchMovieResultCard;
