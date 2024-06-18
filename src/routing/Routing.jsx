import { Routes, Route } from "react-router-dom";
import LayoutMain from "../components/Header/Layout";
import Homepage from "../Page/Homepage/Homepage";
import Login from "../Page/LoginPage/Login";
import AdminPage from "../Page/Adminpage/Admin";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />       
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default Routing;