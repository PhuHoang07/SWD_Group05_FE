import { Routes, Route } from "react-router-dom";
import LayoutMain from "../components/Header/Layout";
import Homepage from "../Page/Homepage/Homepage";
import Login from "../Page/LoginPage/Login";
import AdminPage from "../Page/Adminpage/Admin";
import ForgotPassword from "../Page/LoginPage/ForgotPass";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />       
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default Routing;