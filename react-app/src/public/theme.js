import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      darker: '#7b1fa2',
      lighter: '#ba68c8',
    },
    expire10: {
      main: '#ff9e80',
      lighter: '#ffb19980',
    },
    expire30: {
      main: '#ffd180',
      lighter: '#ffda9980',
    },
    safe: {
      main: '#ccff90',
      lighter: '#d6ffa680',
    },
  },
});

export default theme;
