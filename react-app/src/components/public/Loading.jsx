import React from 'react';

import RotateRightIcon from '@mui/icons-material/RotateRight';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: 'large',
  animation: 'spin 2s linear infinite',
};

const Loading = React.forwardRef((props, ref) => (
  <>
    <RotateRightIcon sx={{ style }} ref={ref} />
    <style>
      {`@keyframes spin {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
        }`}
    </style>
  </>
));

Loading.propTypes = {};

export default Loading;
