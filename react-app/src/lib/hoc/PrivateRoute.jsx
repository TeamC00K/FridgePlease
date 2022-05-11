import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  const loggedIn = useSelector(state => state.user.isSuccess);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
