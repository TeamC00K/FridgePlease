import React from 'react';

import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClicklabel="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Category" icon={<TocIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Shop" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Person" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
