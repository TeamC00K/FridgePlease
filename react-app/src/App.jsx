import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './lib/hoc/PrivateRoute';

// import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
