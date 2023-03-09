import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function GoToPageLink({ href }: { href: string }) {
  return (
    <Button
      LinkComponent='a'
      href={href}
      target='_blank'
      referrerPolicy='no-referrer'
      endIcon={<OpenInNewIcon />}
    >
      Go to Page
    </Button>
  );
}

export default GoToPageLink;
