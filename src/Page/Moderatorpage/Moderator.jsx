import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './Moderator.css';
import logo from '../../assets/logo-form.png';

const { Header, Sider, Content } = Layout;

const Moderator = () => {
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
        className="moderator-sider"
      >
        <div className="moderator-logo">
          {collapsed ? (
            <img src={logo} alt="Moderator logo" />
          ) : (
            <>
              <img src={logo} alt="Moderator logo" />
              <span>Moderator Dashboard</span>
            </>
          )}
        </div>
        <Menu theme="dark" mode="inline" style={{ background: '#001529', borderRight: 0 }}>
          <Menu.Item key="1" icon={<FileTextOutlined />} className="moderator-menu-item">
            <Link style={{ textDecoration: 'none' }} to="report-list">Report List</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />} className="moderator-menu-item">
            <Link style={{ textDecoration: 'none' }} to="product-post-list">Product Post List</Link>
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

export default Moderator;
