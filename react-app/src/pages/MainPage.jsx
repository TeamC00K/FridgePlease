import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/public/Header';
import PriorItemList from '../components/main/PriorItemList';
import SearchBar from '../components/main/SearchBar';
import Menu from '../components/main/Menu';
import Category from '../components/main/Category';
import BottomNav from '../components/public/BottomNav';

import { userSelector } from '../modules/user';
import { initItems, itemSelector } from '../modules/items';

function MainPage() {
  const dispatch = useDispatch();
  const { id } = useSelector(userSelector);
  const { itemList, isSuccess } = useSelector(itemSelector);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(initItems(id));
    }
  }, []);

  return (
    <>
      <Header title=" " type="main" />
      {isSuccess && <PriorItemList itemList={itemList} />}
      <SearchBar />
      <Menu />
      <Category />
      <BottomNav />
    </>
  );
}

export default MainPage;
