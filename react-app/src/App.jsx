import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './lib/hoc/PrivateRoute';

// import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import EntireItemPage from './pages/EntireItemPage';
import PushAlertPage from './pages/PushAlertPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/:itemId" element={<MainPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/items" element={<EntireItemPage />} />
        <Route path="/push" element={<PushAlertPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
