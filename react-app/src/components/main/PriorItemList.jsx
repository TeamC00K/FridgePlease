import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { Typography } from '@mui/material';
import PriorItem from './PriorItem';

function PriorItemList(props) {
  const { itemList } = props;

  const [expiredItems, setExpiredItems] = useState([]);
  const [scarceItems, setScarceItems] = useState([]);

  useEffect(() => {
    let tmpList = itemList.filter(item => item.elapsedRate < 0.3);
    tmpList.sort((a, b) => a.leftDate - b.leftDate);
    setExpiredItems(tmpList);
    tmpList = itemList.filter(item => item.consumptionRate < 0.3);
    tmpList.sort((a, b) => a.consumptionRate - b.consumptionRate);
    setScarceItems(tmpList);
    // console.log(expiredItems, scarceItems);
  }, [itemList]);

  // key value 수정 필요
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'scroll',
        marginTop: 1,
        width: '100vw',
        height: '40vw',
      }}
    >
      {expiredItems.map((item, index) => (
        <PriorItem key={index} item={item} type="expired" />
      ))}
      {scarceItems.map((item, index) => (
        <PriorItem key={index} item={item} type="scarce" />
      ))}
      {expiredItems.length === 0 && scarceItems.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
          }}
        >
          <Typography>유통기한 임박 상품이 없습니다.</Typography>
        </Box>
      )}
    </Box>
  );
}

PriorItemList.propTypes = {
  itemList: PropTypes.array.isRequired,
};

export default PriorItemList;
