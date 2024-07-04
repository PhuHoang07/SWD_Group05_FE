import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import FooterLayout from './Footer';
import HeaderLayout from './Header';

const { Header, Content } = Layout;

const LayoutMain = () => {
  return (
    <Layout>
      <Header>
        <HeaderLayout />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default LayoutMain;
