import { type ReactNode } from 'react';
import { Box } from '@mui/material';

interface BannerProps {
  children: ReactNode;
  imagePath: string;
}

function Banner({ children, imagePath }: BannerProps) {
  return (
    <Box
      sx={{
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${imagePath})`,
      }}
    >
      <Box
        py={6}
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Banner;
