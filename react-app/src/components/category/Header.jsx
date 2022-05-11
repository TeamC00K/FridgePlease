import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import { Fab } from '@mui/material';

function Header(props) {
  const { sections } = props;

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        justifyContent: 'space-between',
        overflowX: 'auto',
        marginY: 2,
      }}
    >
      {sections.map(section => (
        <Fab
          variant="extended"
          sx={{
            p: 1,
            flexShrink: 0,
            backgroundColor: section.color,
            paddingX: '50px',
            marginX: '10px',
          }}
        >
          {section.title}
        </Fab>
      ))}
    </Toolbar>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Header;
