import { Routes, Route } from "react-router-dom";
import LayoutMain from "../components/Header/Layout";
import Homepage from "../components/Page/Homepage";
import Login from "../components/Page/Login";


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Homepage />} />       
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
    
  );
}

export default Routing;