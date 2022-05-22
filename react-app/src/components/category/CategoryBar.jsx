import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import categorys from '../../public/category';

function CategoryBar(props) {
  const { curCategory } = props;

  return (
    <Toolbar
      component="nav"
      sx={{
        overflowX: 'auto',
        flexWrap: 'nowrap',
      }}
    >
      {Object.entries(categorys).map(([index, val]) => (
        <Link
          to={`/category/${index}`}
          key={index}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            color={curCategory === index ? grey[500] : grey[900]}
            noWrap
            variant="body2"
            sx={{ p: 1, flexShrink: 0 }}
          >
            {val.name}
          </Typography>
        </Link>
      ))}
    </Toolbar>
  );
}

CategoryBar.propTypes = {
  curCategory: PropTypes.string.isRequired,
};

export default CategoryBar;
