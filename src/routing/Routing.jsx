import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutMain from '../components/Header/LayoutMain';
import Homepage from '../Page/Homepage/Homepage';
import Login from '../Page/LoginPage/Login';
import Admin from '../Page/Adminpage/Admin';
import ForgotPassword from '../Page/LoginPage/ForgotPass';
import ManageCoinPackages from '../Page/Adminpage/ManageCoinPackages';
import ManageAccounts from '../Page/Adminpage/ManageAccounts';
import ManageCategories from '../Page/Adminpage/ManageCategories';
import UserChat from "../Page/Userpage/UserChat";
import ProductDetails from '../Page/ProductDetails/ProductDetail';
import CreatePost from '../Page/ProductDetails/CreatePost';
import UserProfile from "../Page/Userpage/UserProfile";
import PostModePackage from '../Page/Userpage/PostModePackage';
import EditProfile from '../Page/Userpage/EditProfile';
import Page404 from '../Page/LoginPage/404page';
import ProtectedRoute from './ProtectedRoute';
import ManageCampus from '../Page/Adminpage/ManageCampus';
import ManagePostMode from '../Page/Adminpage/ManagePostMode';
import ProductPostList from '../Page/Moderatorpage/ProductPostList';
import ReportList from '../Page/Moderatorpage/ReportList';
import Moderator from '../Page/Moderatorpage/Moderator';
import SellerHistory from '../Page/Userpage/Buyer history/SellerHistory';
import PostApplyDetails from '../Page/Userpage/ListSeller/PostApplyDetails';
import PayMentSuccess from '../Page/Userpage/payMentSuccess';
import BuyerHistory from '../Page/Userpage/Buyer history/BuyerHistory';


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user-chat" element={<UserChat />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="package-postmode" element={<PostModePackage />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="seller-history" element={<SellerHistory />} />
          <Route path="buyer-history" element={<BuyerHistory />} />
          <Route path="post-apply-details/:id" element={<PostApplyDetails />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute isAdminRoute={true} />}>
        <Route path="/admin" element={<Admin />}>
          <Route path="manage-coin-packages" element={<ManageCoinPackages />} />
          <Route path="manage-accounts" element={<ManageAccounts />} />
          <Route path="manage-campus" element={<ManageCampus />} />
          <Route path="manage-categories" element={<ManageCategories />} />
          <Route path="manage-post-mode" element={<ManagePostMode />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute isModeratorRoute={true} />}>
        <Route path="/moderator" element={<Moderator />}>
          <Route path="product-post-list" element={<ProductPostList />} />
          <Route path="report-list" element={<ReportList />} />
        </Route>
      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/404-notfound" element={<Page404 />} />
      <Route path="/payment-success" element={<PayMentSuccess />} />
    </Routes>

  );
}

export default Routing;
