import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import { userSlice } from './user';
import { itemSlice } from './items';

const reducer = {
  user: userSlice.reducer,
  items: itemSlice.reducer,
};

const preloadedState = {
  user: {
    name: '',
    id: '',
  },
};

export default configureStore({
  reducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: true,
  preloadedState,
});
