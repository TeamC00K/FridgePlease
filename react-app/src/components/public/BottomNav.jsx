import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

function BottomNav(props) {
  const { value } = props;
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/');
              break;
            case 1:
              navigate('/category/vegetable');
              break;
            case 2:
              navigate('/items');
              break;
            default:
              navigate('/');
              break;
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Category" icon={<TocIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Shop" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Person" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

BottomNav.propTypes = {
  value: PropTypes.number.isRequired,
};

export default BottomNav;
