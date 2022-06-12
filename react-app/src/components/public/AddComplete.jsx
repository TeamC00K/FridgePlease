/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Avatar } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { grey } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};

const AddComplete = React.forwardRef((props, ref) => {
  const { num } = props;

  return (
    <Box sx={style} ref={ref} tabIndex={-1}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Avatar sx={{ width: '20vw', height: '20vw', bgcolor: grey[300] }}>
          <AddTaskIcon sx={{ fontSize: '16vw' }} color="primary" />
        </Avatar>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {num}개의 상품이
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          냉장고에 추가되었습니다
        </Typography>
      </Box>
    </Box>
  );
});

AddComplete.propTypes = {
  num: PropTypes.number.isRequired,
};

export default AddComplete;
