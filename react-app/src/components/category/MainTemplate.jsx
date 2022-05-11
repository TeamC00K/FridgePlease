import React from 'react';
// import PropTypes from 'prop-types';
import { Container } from '@mui/material';

import porkImg from '../../public/pork.jpg';
import bananaImg from '../../public/banana.jpg';
import milkImg from '../../public/milk2.jpg';

import Header from './Header';
import Item from './Item';

// import TopBar from './TopBar';

const sections = [
  { title: '유통기한', url: '#', color: '#99dfff' },
  { title: '구매일자', url: '#', color: '#c7f7d4' },
  { title: ' 육류 ', url: '#', color: '#ff99bb' },
  { title: ' 채소 ', url: '#', color: '#ffda99' },
  { title: ' 유제품 ', url: '#', color: '#a3b1ff' },
  { title: ' 기타 ', url: '#', color: '#ffb199' },
];

const items = [
  {
    name: '돼지고기',
    mfgDate: new Date(2022, 3, 28),
    expDate: new Date(2022, 4, 5),
    memo: '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하',
    image: porkImg,
    imageLabel: 'Image Text',
    category: 'meat',
    subCategory: 'pork',
    countable: true,
    frozen: false,
    totalVol: 400,
    curVol: 200,
  },
  {
    name: '바나나',
    mfgDate: new Date(2022, 3, 28),
    expDate: new Date(2022, 3, 30),
    memo: '',
    image: bananaImg,
    imageLabel: 'Image Text',
    category: 'meat',
    subCategory: 'pork',
    countable: false,
    frozen: false,
    totalVol: 1,
    curVol: 0.75,
  },
  {
    name: '우유',
    mfgDate: new Date(2022, 3, 28),
    expDate: new Date(2022, 4, 10),
    memo: '',
    image: milkImg,
    imageLabel: 'Image Text',
    category: 'meat',
    subCategory: 'pork',
    countable: true,
    frozen: false,
    totalVol: 100,
    curVol: 20,
  },
  {
    name: '우유',
    mfgDate: new Date(2022, 3, 28),
    expDate: new Date(2022, 4, 5),
    memo: '',
    image: milkImg,
    imageLabel: 'Image Text',
    category: 'meat',
    subCategory: 'pork',
    countable: false,
    frozen: false,
    totalVol: 1,
    curVol: 0.5,
  },
  {
    name: '우유',
    mfgDate: new Date(2022, 3, 28),
    expDate: new Date(2022, 4, 5),
    memo: '',
    image: milkImg,
    imageLabel: 'Image Text',
    category: 'meat',
    subCategory: 'pork',
    countable: true,
    frozen: false,
    totalVol: 100,
    curVol: 20,
  },
];

function MainTemplate() {
  return (
    <Container maxWidth="lg">
      <Header title="Blog" sections={sections} />
      <main>
        {items.map(item => (
          <Item key={item.name} item={item} />
        ))}
      </main>
    </Container>
  );
}

export default MainTemplate;
