import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { grey } from '@mui/material/colors';

import DetailPage from '../../pages/DetailPage';
import categorys from '../../public/category';

function PriorItem(props) {
  const { item, type } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let bgColor;
  if (type === 'expired') {
    if (item.leftDate < 3) {
      bgColor = 'expire10';
    } else {
      bgColor = 'expire30';
    }
  } else {
    if (item.consumptionRate < 0.1) {
      bgColor = 'expire10';
    } else {
      bgColor = 'expire30';
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <DetailPage item={item} />
      </Modal>
      <Box sx={{ width: '30vw', height: '40vw', m: 2 }} onClick={handleOpen}>
        <Badge
          badgeContent={
            type === 'expired'
              ? `D${item.leftDate < 0 ? '+' : '-'}${Math.abs(item.leftDate)}`
              : `${item.consumptionRate * 100}%`
          }
          color={bgColor}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '1.25rem',
              height: '1.5rem',
              minWidth: '1.5rem',
            },
          }}
        >
          <Avatar
            sx={{ width: '30vw', height: '30vw', bgcolor: grey[300] }}
            src={process.env.PUBLIC_URL + categorys[item.category].img}
          />
        </Badge>
        <Box
          sx={{
            width: '30vw',
            height: '10vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {item.name}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

PriorItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    leftDate: PropTypes.number.isRequired,
    elapsedRate: PropTypes.number.isRequired,
    consumptionRate: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default PriorItem;
