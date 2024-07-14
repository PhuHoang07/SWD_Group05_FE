import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import FooterLayout from './Footer';
import HeaderLayout from './Header';

const { Header, Content, Footer } = Layout;

const LayoutMain = () => {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header>
        <HeaderLayout />
      </Header>
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
      <Footer style={{ backgroundColor: '#f1f1f1', padding: '1em 0', textAlign: 'center' }}>
        <FooterLayout />
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
