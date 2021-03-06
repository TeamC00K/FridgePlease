/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, TextField, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

let ratio;

const style1 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 1,
  height: ratio,
  position: 'relative',
};

const style2 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: ratio,
  height: 1,
  position: 'relative',
};

function CroppedItem(props) {
  const { index, cropData, image, imageSize, edit, delFunc } = props;

  ratio = (imageSize[1] * 9) / (imageSize[0] * 16);

  const [del, setDel] = useState(false);

  const startPos = [
    cropData.startX / imageSize[0],
    cropData.startY / imageSize[1],
  ];
  const endPos = [cropData.endX / imageSize[0], cropData.endY / imageSize[1]];

  const handleChange = event => {
    edit(index, event.target.value);
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
      }}
    >
      {del && (
        <Button
          onClick={() => {
            setDel(false);
            delFunc(index, false);
          }}
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
        </Button>
      )}
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
      >
        <Box sx={imageSize[0] * 16 > imageSize[1] * 9 ? style1 : style2}>
          <img src={image.src} alt="register" width="100%" height="100%" />
          <Box
            sx={{
              position: 'absolute',
              left: `${(startPos[0] * 100).toString()}%`,
              top: `${(startPos[1] * 100).toString()}%`,
              width: endPos[0] - startPos[0],
              height: endPos[1] - startPos[1],
              border: 4,
              borderColor: 'red',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ px: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            id="standard-basic"
            variant="standard"
            defaultValue={cropData.subCategory}
            onChange={handleChange}
            inputProps={{ style: { fontSize: 30 } }}
          />
          <IconButton
            onClick={() => {
              setDel(true);
              delFunc(index, true);
            }}
            aria-label="delete"
            size="large"
            sx={{ paddingRight: 0 }}
          >
            <DeleteIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

CroppedItem.propTypes = {
  index: PropTypes.number.isRequired,
  cropData: PropTypes.shape({
    subCategory: PropTypes.string.isRequired,
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
  }).isRequired,
  image: PropTypes.instanceOf(Image).isRequired,
  imageSize: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  delFunc: PropTypes.func.isRequired,
};

export default CroppedItem;
