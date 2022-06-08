import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import categorys from '../../public/category';

function Category() {
  return (
    <Grid container sx={{ p: 1 }}>
      {Object.entries(categorys).map(([index, val]) => (
        <Grid item xs={3} key={index}>
          <Button fullWidth sx={{ flexDirection: 'column' }}>
            <Link to={`/category/${index}`}>
              <img alt={val.name} src={process.env.PUBLIC_URL + val.img} />
            </Link>
            <Box>
              <Typography sx={{ fontSize: '12px' }}>{val.name}</Typography>
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Category;
