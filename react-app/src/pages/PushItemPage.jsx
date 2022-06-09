/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';
import Header from '../components/public/Header';
import Item from '../components/category/Item';
import BottomNav from '../components/public/BottomNav';

import { itemSelector } from '../modules/items';

import DetailPage from './DetailPage';
import SearchBar from '../components/main/SearchBar';

function PushItemPage() {
  const { itemId } = useParams();
  const { itemList } = useSelector(itemSelector);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/items');
  };

  const [processedList, setProcessedList] = useState([]);
  const [pushItem, setPushItem] = useState();

  useEffect(() => {
    const tmpList = itemList.sort((a, b) => a.leftDate - b.leftDate);
    setProcessedList(tmpList);
  }, []);

  useEffect(() => {
    console.log(itemList, itemId);
    if (itemId) {
      const tmpItem = itemList.find(val => val.itemId.toString() === itemId);
      console.log(tmpItem);
      setPushItem(tmpItem);
    }
  }, [itemId]);

  useEffect(() => {
    if (pushItem) handleOpen();
  }, [pushItem]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <DetailPage item={pushItem} />
      </Modal>
      <SearchBar />
      <Header title="" type="entire" />
      {processedList.map(item => (
        <Item key={item.key} item={item} />
      ))}
      <BottomNav value={1} />
    </>
  );
}

export default PushItemPage;
