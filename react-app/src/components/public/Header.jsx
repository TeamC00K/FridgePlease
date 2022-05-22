import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function Header(props) {
  const { title, type } = props;
  const navigate = useNavigate();

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {type === 'main' ? (
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        {title}
      </Typography>
      {type !== 'main' && (
        <IconButton>
          <SearchIcon />
        </IconButton>
      )}
    </Toolbar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
