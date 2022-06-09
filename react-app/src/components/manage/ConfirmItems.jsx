/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { grey } from '@mui/material/colors';

import { Box, Typography, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteItem, changeItemName } from '../../lib/api/item';
import categorys from '../../public/category';
import { userSelector } from '../../modules/user';
import { initItems } from '../../modules/items';

function ConfirmItems(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, onClose } = props;

  const { id } = useSelector(userSelector);

  const confirm = async () => {
    await Object.entries(items).map(async ([index, item]) => {
      if (item.isDeleted) {
        await deleteItem(item.itemId);
      } else {
        if (item.isChanged) {
          await changeItemName({
            itemId: item.itemId,
            newName: item.subCategory,
          });
        }
      }
    });
    await dispatch(initItems(id));
    onClose();
  };

  return (
    <Box
      sx={{
        display: 'block',
        width: '90vw',
        height: '80vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        marginRight: '2.5vw',
        flexShrink: 0,
        p: 2,
        position: 'relative',
        overflow: 'scroll',
      }}
    >
      {Object.entries(items).map(([index, item]) => (
        <Box
          key={index}
          sx={{
            height: '14vh',
            paddingX: '1vh',
            paddingY: '2vh',
            borderBottom: 2,
            position: 'relative',
          }}
        >
          {item.isDeleted && (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 1,
                height: 1,
                zIndex: 2,
                bgcolor: '#000000a0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DeleteIcon sx={{ fontSize: 50, color: '#ffffff' }} />
            </Box>
          )}
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Avatar
              sx={{
                height: '10vh',
                width: '10vh',
                bgcolor: grey[300],
              }}
              src={process.env.PUBLIC_URL + categorys[item.category].img}
            />
            <Typography sx={{ p: 2 }} variant="h4">
              {item.subCategory}
            </Typography>
          </Box>
        </Box>
      ))}
      <Button
        onClick={confirm}
        variant="contained"
        fullWidth
        size="large"
        sx={{ marginTop: 2 }}
      >
        수정 완료
      </Button>
    </Box>
  );
}

ConfirmItems.propTypes = {
  items: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmItems;
