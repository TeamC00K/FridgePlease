import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, Avatar, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from '@mui/material/Slider';

import { buyItem } from '../../lib/api/item';
import { userSelector } from '../../modules/user';
import { itemSelector, initItems } from '../../modules/items';
import categorys from '../../public/category';
import AddComplete from '../public/AddComplete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};

const BuyPop = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { buyList, delBuy, cleanBuy } = props;

  const { itemList } = useSelector(itemSelector);
  const { id } = useSelector(userSelector);

  const [fin, setFin] = useState(false);
  const [buyNum, setBuyNum] = useState(0);

  const buy = async () => {
    let buyCnt = 0;
    await buyList.map(async item => {
      buyCnt += 1;
      item.userId = id;
      await buyItem(item);
    });
    await dispatch(initItems(id));
    setBuyNum(buyCnt);
    setFin(true);
    cleanBuy();
  };

  let price = 0;
  buyList.map(item => {
    price += item.price;
    return 0;
  });

  useEffect(() => {
    console.log(buyList);
  }, []);

  if (fin) {
    return <AddComplete num={buyNum} />;
  }

  return (
    <Box sx={style} ref={ref} tabIndex={-1}>
      <Box sx={{ overflowY: 'scroll', height: 1 }}>
        {buyList.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                height: '12vh',
                paddingX: '1vh',
                paddingY: '1vh',
                borderBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    height: '10vh',
                    width: '10vh',
                  }}
                  src={item.imgSrc}
                />
                <Typography sx={{ p: 2, flexGrow: 1 }} variant="h5">
                  {item.name}
                </Typography>
                <IconButton
                  onClick={() => {
                    delBuy(index);
                  }}
                  aria-label="del shop"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            {itemList
              .filter(havingItem => havingItem.name === item.name)
              .map((remainItem, remainIndex) => (
                <Box
                  key={remainIndex}
                  sx={{
                    height: '11vh',
                    marginLeft: 4,
                    paddingX: '1vh',
                    paddingY: '1vh',
                    borderBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        height: '8vh',
                        width: '8vh',
                      }}
                      src={categorys[remainItem.category].img}
                    />
                    <Box sx={{ paddingX: 1, flexGrow: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {new Date(remainItem.expDate).getMonth() + 1}월{' '}
                        {new Date(remainItem.expDate).getDate()}일
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {new Date(remainItem.mfgDate).getMonth() + 1}월{' '}
                        {new Date(remainItem.mfgDate).getDate()}일
                      </Typography>
                      <Slider
                        value={remainItem.consumptionRate * 100}
                        size="small"
                        disableSwap
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        ))}
      </Box>
      <Button
        onClick={buy}
        variant="contained"
        fullWidth
        size="large"
        sx={{ marginTop: 2, p: 1 }}
      >
        {price}원 결제하기
      </Button>
    </Box>
  );
});

BuyPop.propTypes = {
  buyList: PropTypes.array.isRequired,
  delBuy: PropTypes.func.isRequired,
  cleanBuy: PropTypes.func.isRequired,
};

export default BuyPop;
