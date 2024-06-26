import { Routes, Route } from "react-router-dom";
import LayoutMain from "../components/Header/Layout";
import Homepage from "../Page/Homepage/Homepage";
import Login from "../Page/LoginPage/Login";
import AdminPage from "../Page/Adminpage/Admin";
import ForgotPassword from "../Page/LoginPage/ForgotPass";
import ProductDetails from "../Page/ProductDetails/ProductDetail";
import UserChat from "../Page/Userpage/UserChat";
import UserProfile from "../Page/Userpage/UserProfile";
import CreatePost from "../Page/ProductDetails/CreatePost";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />      
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/user-chat" element={<UserChat />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Route>
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default Routing;