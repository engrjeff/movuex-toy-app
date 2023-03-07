import Image from 'next/image';
import { Box, Chip, Typography } from '@mui/material';
import { TvShow } from './types';
import AppLink from '@/components/AppLink';

interface TvShowCardProps {
  tvShow: TvShow;
}

const TvShowCard = ({ tvShow }: TvShowCardProps) => {
  return (
    <AppLink href={`/tv-shows/${tvShow.id}`}>
      <Box sx={{ position: 'relative', width: '100%', height: 330 }}>
        <Image
          src={tvShow.poster_path}
          alt={tvShow.name}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>
      <Box mt={2}>
        <Typography component='h3' fontSize={13} fontWeight={600} textTransform='capitalize'>
          {tvShow.name}
        </Typography>
        <Chip label='TV Show' size='small' />
      </Box>
    </AppLink>
  );
};

export default TvShowCard;
