/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';
import Header from '../components/public/Header';
import CategoryBar from '../components/category/CategoryBar';
import SubCategoryBar from '../components/category/SubCategoryBar';
import Item from '../components/category/Item';
import BottomNav from '../components/public/BottomNav';

import DetailPage from './DetailPage';
import { itemSelector } from '../modules/items';
import categorys from '../public/category';

function CategoryPage() {
  const { categoryName } = useParams();
  const { itemList } = useSelector(itemSelector);

  const [selectedList, setSelectedList] = useState([]);
  const [processedList, setProcessedList] = useState([]);
  const [sortBy, setSortBy] = useState({ type: 'leftDate', asc: true });
  const [subCategory, setSubCategory] = useState('');

  const [open, setOpen] = useState(false);
  const [modalItem, setModalItem] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const tmpList = itemList.filter(item => item.category === categoryName);
    setSelectedList(tmpList);
    setSubCategory('');
  }, [categoryName]);

  useEffect(() => {
    console.log(sortBy, subCategory);
    let tmpList;
    if (subCategory) {
      tmpList = selectedList.filter(item => item.subCategory === subCategory);
    } else {
      tmpList = selectedList;
    }
    console.log('before', tmpList);
    tmpList = tmpList.sort((a, b) => {
      if (sortBy.type === 'leftDate') {
        if (sortBy.asc) {
          return a.leftDate - b.leftDate;
        } else {
          return b.leftDate - a.leftDate;
        }
      } else if (sortBy.type === 'mfgDate') {
        if (sortBy.asc) {
          return a.mfgDate - b.mfgDate;
        } else {
          return b.mfgDate - a.mfgDate;
        }
      } else if (sortBy.type === 'consumptionRate') {
        if (sortBy.asc) {
          return a.consumptionRate - b.consumptionRate;
        } else {
          return b.consumptionRate - a.consumptionRate;
        }
      }
      return 0;
    });
    console.log('after', tmpList);
    setProcessedList(tmpList);
  }, [selectedList, sortBy, subCategory]);

  // 이슈
  useEffect(() => {
    console.log(processedList);
  }, [processedList]);

  return (
    <>
      <Header title={categorys[categoryName].name} type="category" />
      <CategoryBar curCategory={categoryName} />
      <SubCategoryBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        curCategory={categoryName}
      />
      {processedList.map(item => (
        <Item
          key={item.key}
          item={item}
          setModalItem={setModalItem}
          handleOpen={handleOpen}
        />
      ))}
      <Modal open={open} onClose={handleClose}>
        <DetailPage item={modalItem} />
      </Modal>
      <BottomNav />
    </>
  );
}

export default CategoryPage;
