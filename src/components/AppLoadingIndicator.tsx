import { Box, CircularProgress } from '@mui/material';

function AppLoadingIndicator() {
  return (
    <Box py={6} display='flex' alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Box>
  );
}

export default AppLoadingIndicator;
