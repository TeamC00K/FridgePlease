/* eslint-disable no-unused-vars */
import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ShopItem(props) {
  const { item, addBuy } = props;

  const handleClick = () => {
    addBuy(item);
  };

  return (
    <Card sx={{ width: '100%', p: 1 }}>
      <Typography
        paddingX={1}
        variant="h5"
        color="text.primary"
        sx={{ fontWeight: 'bold' }}
      >
        {item.name}
      </Typography>
      <CardMedia
        component="img"
        image={item.imgSrc}
        sx={{
          width: '100%',
          aspectRatio: '1/1',
          objectFit: 'contain',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ p: 1 }} variant="h6" color="text.secondary">
          {item.price}원
        </Typography>
        <IconButton
          onClick={handleClick}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

ShopItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addBuy: PropTypes.func.isRequired,
};

export default ShopItem;
