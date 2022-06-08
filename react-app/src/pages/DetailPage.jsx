import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Slider from '@mui/material/Slider';

import categorys from '../public/category';
import { updateItemConsumption } from '../modules/items';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

const DetailPage = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { item } = props;

  const [consumptionRate, setConsumptionRate] = useState(
    item.consumptionRate * 100,
  );

  const handleChange = (event, newValue) => {
    setConsumptionRate(newValue);
  };

  const updateConsumptionRate = (event, newValue) => {
    const newRate = newValue / 100;
    dispatch(updateItemConsumption({ key: item.key, newRate }));
  };

  return (
    <Card sx={style} ref={ref} tabIndex={-1}>
      <Box
        sx={{
          height: '15vh',
          display: 'flex',
        }}
      >
        <CardMedia
          component="img"
          src={process.env.PUBLIC_URL + categorys[item.category].img}
          sx={{
            height: '15vh',
            width: '15vh',
          }}
        />
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
            {new Date(item.expDate).getMonth() + 1}월{' '}
            {new Date(item.expDate).getDate()}일
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(item.mfgDate).getMonth() + 1}월{' '}
            {new Date(item.mfgDate).getDate()}일
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {item.memo}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ paddingX: 1 }}>
        <Slider
          value={consumptionRate}
          onChange={handleChange}
          onChangeCommitted={updateConsumptionRate}
        />
      </Box>
    </Card>
  );
});

DetailPage.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    expDate: PropTypes.string.isRequired,
    mfgDate: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    totalVol: PropTypes.number.isRequired,
    curVol: PropTypes.number.isRequired,
    elapsedRate: PropTypes.number.isRequired,
    consumptionRate: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailPage;
