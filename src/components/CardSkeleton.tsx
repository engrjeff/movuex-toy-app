import { Box, Skeleton } from '@mui/material';

function CardSkeleton() {
  return (
    <Box py={6}>
      <Box mb={4} display='flex' justifyContent='space-between'>
        <Skeleton variant='rounded' width={260} height={40} />
        <Skeleton variant='rounded' width={360} height={40} />
      </Box>
      <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap={2}>
        {[...Array(20)].map((n) => (
          <Skeleton key={n} variant='rounded' width={220} height={350} />
        ))}
      </Box>
    </Box>
  );
}

export default CardSkeleton;
