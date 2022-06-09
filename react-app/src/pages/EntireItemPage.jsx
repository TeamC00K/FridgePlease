/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/public/Header';
import Item from '../components/category/Item';
import BottomNav from '../components/public/BottomNav';

import { itemSelector } from '../modules/items';
import SearchBar from '../components/main/SearchBar';

function EntireItemPage() {
  const { itemList } = useSelector(itemSelector);

  const [processedList, setProcessedList] = useState([]);

  useEffect(() => {
    const tmpList = itemList.sort((a, b) => a.leftDate - b.leftDate);
    setProcessedList(tmpList);
  }, []);

  return (
    <>
      <Header title="" type="entire" />
      <SearchBar />
      {processedList.map(item => (
        <Item key={item.key} item={item} />
      ))}
      <BottomNav value={2} />
    </>
  );
}

export default EntireItemPage;
