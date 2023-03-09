import Link from 'next/link';
import Typography from '@mui/material/Typography';

function Brand() {
  return (
    <Typography
      component='h1'
      fontSize={{
        xs: '1.2rem',
        sm: '2rem',
      }}
      fontWeight='bold'
    >
      <Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
        Movuex
      </Link>
    </Typography>
  );
}

export default Brand;
