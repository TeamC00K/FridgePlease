import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { green, orange, red, blue } from '@mui/material/colors';

function Menu() {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={1}
      sx={{ height: '20vh', p: 1 }}
    >
      <Grid item xs={6}>
        <Button fullWidth sx={{ height: 1, bgcolor: green[200] }}>
          상품 구매
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ height: 1, bgcolor: orange[200] }}>
          상품 등록
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ height: 1, bgcolor: red[200] }}>
          영양 분석
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ height: 1, bgcolor: blue[200] }}>
          레시피
        </Button>
      </Grid>
    </Grid>
  );
}

export default Menu;
