// Admin.jsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import './Admin.css';
import logo from '../../assets/logo-form.png';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={200}
        className="admin-sider"
      >
        <div className="admin-logo">
          {collapsed ? (
            <img src={logo} alt="Admin logo" />
          ) : (
            <>
              <img src={logo} alt="Admin logo" />
              <span>Admin Dashboard</span>
            </>
          )}
        </div>
        <Menu theme="dark" mode="inline" style={{ background: '#001529', borderRight: 0 }}>
          <Menu.Item key="1" icon={<ShoppingOutlined />} className="admin-menu-item">
            <Link to="manage-coin-packages">Manage Coin Packages</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} className="admin-menu-item">
            <Link to="manage-accounts">Manage Accounts</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />} className="admin-menu-item">
            <Link to="manage-categories">Manage Categories</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;