import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import './Admin.css';
import logo from '../../assets/logo-form.png';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginSuccess');
    navigate('/login');
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
            <Link style={{ textDecoration: 'none' }} to="manage-coin-packages">Manage Coin Packages</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />} className="admin-menu-item">
            <Link style={{ textDecoration: 'none' }} to="manage-post-mode">Manage Post Mode</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} className="admin-menu-item">
            <Link style={{ textDecoration: 'none' }} to="manage-accounts">Manage Accounts</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />} className="admin-menu-item">
            <Link style={{ textDecoration: 'none' }} to="manage-categories">Manage Categories</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreOutlined />} className="admin-menu-item">
            <Link style={{ textDecoration: 'none' }} to="manage-campus">Manage Campus</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', background: '#fff' }}>
          <span />
          <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
            Log Out
          </Button>
        </Header>
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
