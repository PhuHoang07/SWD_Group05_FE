// Routing.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutMain from '../components/Header/Layout';
import Homepage from '../Page/Homepage/Homepage';
import Login from '../Page/LoginPage/Login';
import Admin from '../Page/Adminpage/Admin';
import ForgotPassword from '../Page/LoginPage/ForgotPass';
import ProductDetails from '../Page/ProductDetails/ProductDetail';
import ManageCoinPackages from '../Page/Adminpage/ManageCoinPackages';
import ManageAccounts from '../Page/Adminpage/ManageAccounts';
import ManageCategories from '../Page/Adminpage/ManageCategories';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="manage-coin-packages" element={<ManageCoinPackages />} />
        <Route path="manage-accounts" element={<ManageAccounts />} />
        <Route path="manage-categories" element={<ManageCategories />} />
      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default Routing;
