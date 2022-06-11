/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Header from '../components/public/Header';
import Item from '../components/category/Item';
import BottomNav from '../components/public/BottomNav';

import { itemSelector } from '../modules/items';
import SearchBar from '../components/main/SearchBar';

function EntireItemPage() {
  const { itemList } = useSelector(itemSelector);

  const [processedList, setProcessedList] = useState([]);

  useEffect(() => {
    console.log(itemList);
    const tmpList = [...itemList].sort((a, b) => a.leftDate - b.leftDate);
    setProcessedList(tmpList);
  }, [itemList]);

  return (
    <Box sx={{ pb: 7 }}>
      <Header title="" type="entire" />
      <SearchBar />
      {processedList.map(item => (
        <Item key={item.key} item={item} />
      ))}
      <BottomNav value={2} />
    </Box>
  );
}

export default EntireItemPage;
