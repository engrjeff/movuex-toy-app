import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  marginTop: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    ...theme.typography.h5,
  },

  [theme.breakpoints.up('md')]: {
    ...theme.typography.h4,
  },
}));

export default SectionTitle;
