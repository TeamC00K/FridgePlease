/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Header from '../components/public/Header';
import BuyPop from '../components/shop/BuyPop';
import ShopItem from '../components/shop/ShopItem';
import BottomNav from '../components/public/BottomNav';

import shopList from '../public/shop';

function ShopPage() {
  const [buyList, setBuyList] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addBuy = boughtItem => {
    const tmpList = buyList;
    tmpList.push(boughtItem);
    setBuyList([...tmpList]);
  };

  const delBuy = index => {
    const tmpList = buyList;
    tmpList.splice(index, 1);
    setBuyList([...tmpList]);
  };

  const cleanBuy = index => {
    setBuyList([]);
  };

  useEffect(() => {
    console.log(buyList);
  }, [buyList]);

  return (
    <Box sx={{ pb: 7 }}>
      <Modal open={open} onClose={handleClose}>
        <BuyPop buyList={buyList} delBuy={delBuy} cleanBuy={cleanBuy} />
      </Modal>
      <Header title="Shop" type="shop" />
      <Grid container spacing={1} sx={{ p: 1 }}>
        {Object.entries(shopList).map(([index, val]) => (
          <Grid item xs={6} key={index}>
            <ShopItem key={index} item={val} addBuy={addBuy} />
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={{ position: 'fixed', bottom: 70, right: 12 }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <ShoppingCartIcon />
      </Fab>
      <BottomNav value={3} />
    </Box>
  );
}

export default ShopPage;
