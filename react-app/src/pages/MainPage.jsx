import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import Header from '../components/public/Header';
import PriorItemList from '../components/main/PriorItemList';
import SearchBar from '../components/main/SearchBar';
import Menu from '../components/main/Menu';
import Category from '../components/main/Category';
import BottomNav from '../components/public/BottomNav';

import { itemSelector } from '../modules/items';

function MainPage() {
  const { itemList, isSuccess } = useSelector(itemSelector);

  return (
    <>
      <Box sx={{ pb: 6 }}>
        <Header title=" " type="main" />
        {isSuccess && <PriorItemList itemList={itemList} />}
        <SearchBar />
        <Menu />
        <Category />
      </Box>
      <BottomNav />
    </>
  );
}

export default MainPage;
