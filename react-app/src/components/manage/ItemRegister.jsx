/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import { sendImage, itemSelector } from '../../modules/items';
import { userSelector } from '../../modules/user';

import CroppedItem from './CroppedItem';
import ConfirmItems from './ConfirmItems';
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
};

const style1 = {
  position: 'absolute',
  top: '10%',
  left: 0,
  paddingLeft: '5%',
  width: '100%',
  height: '80%',
  overflowX: 'scroll',
  display: 'flex',
  flexWrap: 'nowrap',
};

const ItemRegister = React.forwardRef((props, ref) => {
  const { onClose } = props;

  const dispatch = useDispatch();
  const { id } = useSelector(userSelector);
  const { isFetching } = useSelector(itemSelector);
  const imgInput = useRef(null);

  const [image, setImage] = useState();
  const [imageSize, setImageSize] = useState();
  const [sendData, setSendData] = useState();
  const [returnSet, setReturnSet] = useState();

  const [fin, setFin] = useState(false);
  const [buyNum, setBuyNum] = useState(0);

  useEffect(() => {
    console.log(returnSet);
  }, [returnSet]);

  const editReturnSet = (key, newname) => {
    const tmpSet = returnSet;
    Object.defineProperty(tmpSet[key], 'isChanged', {
      value: true,
      writable: true,
    });
    tmpSet[key].subCategory = newname;
    setReturnSet({ ...tmpSet });
  };

  const delItem = (key, val) => {
    const tmpSet = returnSet;
    Object.defineProperty(tmpSet[key], 'isDeleted', {
      value: val,
      writable: true,
    });
    setReturnSet({ ...tmpSet });
  };

  const onImgUpload = event => {
    const img = new Image();
    img.onload = function () {
      setImageSize([img.width, img.height]);
    };
    img.src = URL.createObjectURL(event.target.files[0]);
    setImage(img);
    setSendData(event.target.files[0]);
  };

  const onImgUploadButton = event => {
    event.preventDefault();
    imgInput.current.click();
  };

  // api call 부분
  const sendButton = async () => {
    const formData = new FormData();
    formData.append('file', sendData);
    formData.append('id', id);
    const response = await dispatch(sendImage(formData));
    setReturnSet(response.payload);
  };

  if (!returnSet) {
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
              src={image.src}
              alt="register"
              width="100%"
              height="100%"
              style={{ objectFit: 'contain' }}
            />
          )}
        </Box>
        <Button onClick={sendButton} variant="contained" fullWidth size="large">
          {!isFetching ? (
            <>추가</>
          ) : (
            <>
              <RotateRightIcon sx={{ animation: 'spin 2s linear infinite' }} />
              <style>
                {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
          }`}
              </style>
            </>
          )}
        </Button>
      </Card>
    );
  }

  if (fin) {
    return <AddComplete num={buyNum} />;
  }

  return (
    <Box sx={style1} ref={ref} tabIndex={-1}>
      {Object.entries(returnSet).map(([index, item]) => {
        console.log(index);
        return (
          <CroppedItem
            key={index}
            index={index}
            cropData={item}
            image={image}
            imageSize={imageSize}
            edit={editReturnSet}
            delFunc={delItem}
          />
        );
      })}
      <ConfirmItems
        items={returnSet}
        onClose={onClose}
        setBuyNum={setBuyNum}
        setFin={setFin}
      />
    </Box>
  );
});

ItemRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ItemRegister;
