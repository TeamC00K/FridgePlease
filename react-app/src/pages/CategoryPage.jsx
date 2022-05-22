import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/public/Header';
import CategoryBar from '../components/category/CategoryBar';
import SubCategoryBar from '../components/category/SubCategoryBar';
import Item from '../components/category/Item';
import BottomNav from '../components/public/BottomNav';

import { itemSelector } from '../modules/items';
import categorys from '../public/category';

function CategoryPage() {
  const { categoryName } = useParams();
  const { itemList } = useSelector(itemSelector);

  const [selectedList, setSelectedList] = useState([]);
  const [processedList, setProcessedList] = useState([]);
  const [sortBy, setSortBy] = useState({ type: 'leftDate', asc: true });
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    const tmpList = itemList.filter(item => item.category === categoryName);
    setSelectedList(tmpList);
    setSubCategory('');
  }, [categoryName]);

  useEffect(() => {
    let tmpList;
    if (subCategory) {
      tmpList = selectedList.filter(item => item.subCategory === subCategory);
    } else {
      tmpList = selectedList;
    }
    tmpList = tmpList.sort((a, b) => {
      if (sortBy.type === 'leftDate') {
        if (sortBy.asc) {
          return a.leftDate - b.leftDate;
        }
        return b.leftDate - a.leftDate;
      }
      if (sortBy.type === 'mfgDate') {
        const aMfgDate = new Date(a.mfgDate);
        const bMfgDate = new Date(b.mfgDate);
        if (sortBy.asc) {
          return aMfgDate - bMfgDate;
        }
        return bMfgDate - aMfgDate;
      }
      if (sortBy.type === 'consumptionRate') {
        if (sortBy.asc) {
          return a.consumptionRate - b.consumptionRate;
        }
        return b.consumptionRate - a.consumptionRate;
      }
      return 0;
    });
    setProcessedList(tmpList);
    console.log(tmpList);
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
        <Item key={item.key} item={item} />
      ))}
      <BottomNav />
    </>
  );
}

export default CategoryPage;
