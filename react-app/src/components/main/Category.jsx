import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import categorys from '../../public/category';

function Category() {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={1}
      sx={{ height: '30vh', p: 1 }}
    >
      {Object.entries(categorys).map(([index, val]) => (
        <Grid item xs={3} key={index}>
          <Button fullWidth sx={{ height: 1 }}>
            <Link to={`/category/${index}`}>
              <img alt={val.name} src={process.env.PUBLIC_URL + val.img} />
            </Link>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Category;
