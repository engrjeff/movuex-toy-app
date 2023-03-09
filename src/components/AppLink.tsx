import { styled } from '@mui/material/styles';
import Link from 'next/link';

const AppLink = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  color: 'inherit',
  textDecoration: 'none',

  '&:hover': {
    color: theme.palette.primary.main,
  },

  '&.active': {
    color: theme.palette.primary.main,
  },

  '&.active-mobile': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default AppLink;
