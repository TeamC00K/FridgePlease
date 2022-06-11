/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, Avatar, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { buyItem } from '../../lib/api/item';
import { userSelector } from '../../modules/user';
import { itemSelector, initItems } from '../../modules/items';

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
  const { buyList, onClose, delBuy } = props;

  const { itemList } = useSelector(itemSelector);
  const { id } = useSelector(userSelector);

  const buy = async () => {
    await buyList.map(async item => {
      item.userId = id;
      await buyItem(item);
    });
    await dispatch(initItems(id));
    onClose();
  };

  useEffect(() => {
    console.log(buyList);
  }, []);

  return (
    <Box sx={style} ref={ref} tabIndex={-1}>
      <Box sx={{ overflowY: 'scroll', height: 1 }}>
        {buyList.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: '12vh',
              paddingX: '1vh',
              paddingY: '1vh',
              borderBottom: 2,
              position: 'relative',
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
        ))}
      </Box>
      <Button
        onClick={buy}
        variant="contained"
        fullWidth
        size="large"
        sx={{ marginTop: 2, p: 1 }}
      >
        구매
      </Button>
    </Box>
  );
});

BuyPop.propTypes = {
  buyList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  delBuy: PropTypes.func.isRequired,
};

export default BuyPop;
