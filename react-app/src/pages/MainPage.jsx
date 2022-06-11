import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Modal from '@mui/material/Modal';
import Header from '../components/public/Header';
import PriorItemList from '../components/main/PriorItemList';
import SearchBar from '../components/main/SearchBar';
import Menu from '../components/main/Menu';
import Category from '../components/main/Category';
import BottomNav from '../components/public/BottomNav';

import { userSelector } from '../modules/user';
import { initItems, itemSelector } from '../modules/items';
import DetailPage from './DetailPage';

function MainPage() {
  const dispatch = useDispatch();
  const { id } = useSelector(userSelector);
  const { itemList, isSuccess } = useSelector(itemSelector);

  const { itemId } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(initItems(id));
    }
    if (itemId) handleOpen();
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <DetailPage item={itemList[itemId]} />
      </Modal>
      <Header title=" " type="main" />
      {isSuccess && <PriorItemList itemList={itemList} />}
      <SearchBar />
      <Menu />
      <Category />
      <BottomNav value={0} />
    </>
  );
}

export default MainPage;
