import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import PriorItem from './PriorItem';

function PriorItemList(props) {
  const { itemList } = props;

  const [expiredItems, setExpiredItems] = useState([]);
  const [scarceItems, setScarceItems] = useState([]);

  useEffect(() => {
    let tmpList = itemList.filter(item => item.elapsedRate < 0.2);
    tmpList.sort((a, b) => a.leftDate - b.leftDate);
    setExpiredItems(tmpList);
    tmpList = itemList.filter(item => item.consumptionRate < 0.2);
    tmpList.sort((a, b) => a.consumptionRate - b.consumptionRate);
    setScarceItems(tmpList);
  }, [itemList]);

  useEffect(() => {
    console.log('유통기한 임박:', expiredItems);
    console.log('거의 다 소모', scarceItems);
  }, [expiredItems, scarceItems]);

  // key value 수정 필요
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'scroll',
        marginTop: 1,
      }}
    >
      {expiredItems.map((item, index) => (
        <PriorItem key={index} item={item} type="expired" />
      ))}
    </Box>
  );
}

PriorItemList.propTypes = {
  itemList: PropTypes.array.isRequired,
};

export default PriorItemList;
