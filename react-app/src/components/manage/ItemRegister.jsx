/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { sendImage as sendImageApi } from '../../lib/api/item';
import { userSelector } from '../../modules/user';

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
  p: 3,
};

const ItemRegister = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { id } = useSelector(userSelector);
  const imgInput = useRef(null);

  const [image, setImage] = useState();

  const onImgUpload = event => {
    setImage(event.target.files[0]);
  };

  const onImgUploadButton = event => {
    event.preventDefault();
    imgInput.current.click();
  };

  // api call 부분
  const sendImage = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('id', id);
    const response = await sendImageApi(formData);
  };

  return (
    <Card sx={style} ref={ref} tabIndex={-1}>
      <input
        ref={imgInput}
        type="file"
        accept="image/*"
        name="registerImage"
        onChange={onImgUpload}
        style={{ display: 'none' }}
      />
      <Box
        sx={{
          width: '100%',
          aspectRatio: '9/16',
          bgcolor: '#D0D0D0',
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onImgUploadButton}
      >
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="register"
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
          />
        )}
      </Box>
      <Button onClick={sendImage} variant="contained" fullWidth size="large">
        추가
      </Button>
    </Card>
  );
});

ItemRegister.propTypes = {};

export default ItemRegister;
