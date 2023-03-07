import Image from 'next/image';
import { Box, Chip, Typography } from '@mui/material';
import { Movie } from './types';
import AppLink from '@/components/AppLink';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <AppLink href={`/movies/${movie.id}`}>
      <Box sx={{ position: 'relative', width: '100%', height: 330 }}>
        <Image
          src={movie.poster_path}
          alt={movie.title}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>
      <Box mt={2}>
        <Typography component='h3' fontSize={13} fontWeight={600} textTransform='capitalize'>
          {movie.title}
        </Typography>
        <Chip label='Movie' size='small' />
      </Box>
    </AppLink>
  );
};

export default MovieCard;
