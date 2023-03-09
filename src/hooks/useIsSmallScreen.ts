import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useIsSmallScreen() {
  const theme = useTheme();
  const inSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return inSmallScreen;
}
