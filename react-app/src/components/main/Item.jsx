import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

function Item(props) {
  const { item } = props;

  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const start = item.mfgDate.getTime();
    const end = item.expDate.getTime();
    const now = Date.now();
    const elapsedRate = (end - now) / (end - start);
    if (elapsedRate < 0.1) {
      setBgColor('#ffa19950');
    } else if (elapsedRate < 0.3) {
      setBgColor('#ffda9950');
    } else {
      setBgColor('#d6ffa650');
    }
  });

  return (
    <CardActionArea
      onClick={() => {
        console.log('clicked');
      }}
      sx={{ marginBottom: '10px' }}
    >
      <Card
        sx={{
          backgroundColor: bgColor,
        }}
      >
        <Box
          sx={{
            height: '15vh',
            display: 'flex',
            backgroundColor: bgColor,
          }}
        >
          <CardMedia
            sx={{
              height: '15vh',
              width: '15vh',
              p: 1,
              flexShrink: 0,
            }}
          >
            <Avatar src={item.image} sx={{ width: 1, height: 1 }} />
          </CardMedia>
          <CardContent
            sx={{
              height: '15vh',
              p: 1,
              overflow: 'hidden',
            }}
          >
            <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {item.expDate.getMonth() + 1}월 {item.expDate.getDate()}일
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {item.mfgDate.getMonth() + 1}월 {item.mfgDate.getDate()}일
            </Typography>
            <Typography variant="subtitle1" noWrap="true">
              {item.memo}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {item.countable && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', width: '10vw' }}
            >
              {item.curVol}
            </Typography>
          )}
          <Slider
            value={(item.curVol / item.totalVol) * 100}
            sx={{ paddingX: 1 }}
          />
        </Box>
      </Card>
    </CardActionArea>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    expDate: PropTypes.instanceOf(Date).isRequired,
    mfgDate: PropTypes.instanceOf(Date).isRequired,
    memo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    totalVol: PropTypes.number.isRequired,
    curVol: PropTypes.number.isRequired,
    countable: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Item;
