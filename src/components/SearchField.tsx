import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import SearchIcon from '@mui/icons-material/SearchOutlined';

import { useRouter } from 'next/router';
import Link from 'next/link';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

function SearchFieldInput({
  width = 400,
  onClick,
}: {
  width?: number | string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!keyword) return;

    router.push({
      pathname: '/search',
      query: {
        keyword,
      },
    });

    handleClick();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <Box width={width} component='form' onSubmit={handleSubmit} ml='auto'>
      <OutlinedInput
        autoFocus
        fullWidth
        size='small'
        placeholder='Search for movies'
        value={keyword}
        onChange={handleChange}
        sx={{
          [`&.${outlinedInputClasses.root}`]: {
            px: 1,
            py: 0.25,
          },
        }}
        startAdornment={
          <InputAdornment variant='outlined' position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment variant='outlined' position='end'>
            <Button
              onClick={handleClick}
              disabled={!keyword}
              size='small'
              LinkComponent={Link}
              href={`/search?keyword=${keyword}`}
            >
              Search
            </Button>
          </InputAdornment>
        }
      />
    </Box>
  );
}

function SearchField() {
  const inSmallScreen = useIsSmallScreen();
  const [searchShown, setSearchShown] = useState(false);

  const showSearch = () => setSearchShown(true);

  const closeSearch = () => setSearchShown(false);

  return (
    <>
      {inSmallScreen ? (
        <IconButton onClick={showSearch} sx={{ ml: 'auto' }}>
          <SearchIcon />
        </IconButton>
      ) : (
        <SearchFieldInput />
      )}

      <Dialog
        open={searchShown}
        onClose={closeSearch}
        PaperProps={{
          sx: { backgroundImage: 'none', bgcolor: (theme) => theme.palette.background.paper },
        }}
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <SearchFieldInput width='100%' onClick={closeSearch} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchField;
