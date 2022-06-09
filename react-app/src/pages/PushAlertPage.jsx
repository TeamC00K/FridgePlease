/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { itemSelector } from '../modules/items';

function PushAlertPage() {
  const { itemList } = useSelector(itemSelector);

  const [expiredItems, setExpiredItems] = useState();
  const [addr, setAddr] = useState();
  useEffect(() => {
    const tmpList = itemList.filter(item => item.elapsedRate < 0.3);
    tmpList.sort((a, b) => a.leftDate - b.leftDate);
    let tmpString = '';
    tmpList.map(item => {
      tmpString += item.name;
      tmpString += ', ';
      return 0;
    });
    setExpiredItems(tmpString);
    setAddr(tmpList[0].itemId);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: "url('/back.jpg')",
        backgroundSize: 'contain',
      }}
    >
      <Link to={`/items/${addr}`}>
        <Box
          sx={{
            width: '90vw',
            height: '10vh',
            bgcolor: '#ffffff60',
            backdropFilter: 'blur(20px)',
            position: 'absolute',
            left: '5vw',
            top: '28vh',
            borderRadius: 2,
            p: 1,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '6vh',
                height: '6vh',
                backgroundImage: "url('/icon.png')",
                backgroundSize: 'contain',
                bgcolor: '#ffffff',
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ paddingX: 2 }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
              FridgePlease
            </Typography>
            <Typography sx={{ color: '#000000', fontSize: '14px' }}>
              유통기한이 임박한 식재료가 있습니다
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default PushAlertPage;
