import { styled } from '@mui/material/styles';
import Link from 'next/link';

const AppLink = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  color: 'inherit',
  textDecoration: 'none',
  padding: '0 12px',

  '&:hover': {
    color: theme.palette.primary.main,
  },

  '&.active': {
    color: theme.palette.primary.main,
  },
}));

export default AppLink;
