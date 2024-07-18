import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import FooterLayout from './Footer';
import HeaderLayout from './Header';

const { Header, Content, Footer } = Layout;

const LayoutMain = () => {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ backgroundColor: '#006400' }}>
        <HeaderLayout />
      </Header>
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
      <Footer style={{ backgroundColor: '#0000', padding: '1em 0', textAlign: 'center' }}>
        <FooterLayout />
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
