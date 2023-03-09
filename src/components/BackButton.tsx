import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppLink from './AppLink';

interface BackButtonProps {
  backTo: string;
}

function BackButton({ backTo }: BackButtonProps) {
  return (
    <Button
      variant='text'
      startIcon={<ArrowBackIcon />}
      LinkComponent={AppLink}
      href={backTo}
      sx={{ my: { xs: 3, md: 6 } }}
    >
      Back
    </Button>
  );
}

export default BackButton;
