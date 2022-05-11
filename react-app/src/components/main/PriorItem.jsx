import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { grey } from '@mui/material/colors';
import category from '../../public/category';

function PriorItem(props) {
  const { item, type } = props;

  return (
    <Box sx={{ width: '30vw', height: '40vw', m: 2 }}>
      <Badge
        badgeContent={
          type === 'expired'
            ? `D${item.leftDate < 0 ? '+' : '-'}${Math.abs(item.leftDate)}`
            : `${item.consumptionRate * 100}%`
        }
        color="primary"
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
          src={process.env.PUBLIC_URL + category[item.category].img}
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
  );
}

PriorItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    leftDate: PropTypes.number.isRequired,
    consumptionRate: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default PriorItem;
