import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import FooterLayout from "./Footer";
import HeaderLayout from "./Header";

const { Header, Content, Footer } = Layout;

const LayoutMain = () => {
  return (
    <Layout>
      <Header>
        <HeaderLayout />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <div >
        <FooterLayout />
      </div>
    </Layout>
  );
};

export default LayoutMain;