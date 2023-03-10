import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SortIcon from "@mui/icons-material/Sort";

const sortByMap = {
  "popularity.desc": "Popularity Descending",
  "popularity.asc": "Popularity Ascending",
  "release_date.desc": "Release Date Descending",
  "release_date.asc": "Release Date Ascending",
  "original_title.desc": "Title Descending",
  "original_title.asc": "Title Ascending",
};

function MoviesSort() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (sortBy: string) => {
    router.push({
      pathname: "/movies",
      query: {
        ...router.query,
        sortBy,
      },
    });

    handleClose();
  };

  return (
    <>
      <Button
        id='sort-button'
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "white",
          borderColor: (theme) => theme.palette.divider,
        }}
        variant='outlined'
        startIcon={<SortIcon />}
      >
        Sort
      </Button>
      <Menu
        id='sort-menu'
        elevation={2}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: (theme) => theme.palette.divider,
            backgroundImage: "unset",
          },
        }}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {Object.entries(sortByMap).map(([value, label]) => (
          <MenuItem
            key={value}
            onClick={() => handleItemClick(value)}
            selected={value === router.query.sortBy}
            sx={{
              "&.Mui-selected": {
                bgcolor: "primary.main",

                "&:hover": {
                  bgcolor: "primary.main",
                },
              },
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MoviesSort;
