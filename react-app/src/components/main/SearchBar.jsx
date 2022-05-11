import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <Box sx={{ p: 1 }}>
      <Button
        variant="outlined"
        fullWidth
        sx={{ display: 'inline', borderRadius: 50 }}
      >
        <SearchIcon sx={{ float: 'left' }} />
      </Button>
    </Box>
  );
}

export default SearchBar;
