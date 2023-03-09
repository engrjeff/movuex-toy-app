import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { Movie } from './types';

interface SearchMovieResultCardProps {
  movie: Movie;
}

function SearchMovieResultCard({ movie }: SearchMovieResultCardProps) {
  const inSmallScreen = useIsSmallScreen();

  const width = inSmallScreen ? 100 : 150;
  const height = inSmallScreen ? 150 : 200;
  const charLimit = inSmallScreen ? 120 : 400;

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
      <Box width={width} height={height}>
        <Image
          src={movie.poster_path}
          alt={movie.title}
          width={width}
          height={height}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent sx={{ maxHeight: height, overflow: 'hidden' }}>
        <Typography variant='h6' component='h3'>
          {movie.title}
        </Typography>
        <Typography gutterBottom fontSize={13} color='text.secondary'>
          {movie.release_date}
        </Typography>
        <Typography fontSize={14} color='text.secondary'>
          {movie.overview.slice(0, charLimit) + '...'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SearchMovieResultCard;
