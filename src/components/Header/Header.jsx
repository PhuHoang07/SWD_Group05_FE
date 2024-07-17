import React, { useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    UserOutlined,
    ShoppingCartOutlined,
    ShopOutlined,
    TransactionOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        toast.success("Đăng xuất thành công!");
    };

    useEffect(() => {
        const loginSuccess = localStorage.getItem('loginSuccess');
        if (user && user.role && loginSuccess === "true") {
            toast.success("Đăng nhập thành công!");
            setTimeout(() => {
                localStorage.removeItem('loginSuccess');
            }, 100);
        }
    }, [user]);

    const userMenu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/user-profile">Your Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                <Link to="/buyer-history">Product Buy</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShopOutlined />}>
                <Link to="/seller-history">Product Sell</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TransactionOutlined />}>
                <Link to="/view-coin-transaction">View transaction</Link>
            </Menu.Item>
            <Menu.Item key="5" onClick={handleLogout} icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={headerStyle}>
            <div style={logoStyle}>
                <Link to="/" style={logoTextStyle}>FU GoodsExchange</Link>
            </div>
            <div style={{ flex: 1 }}></div>
            <div>
                {user && user.role ? (
                    <Dropdown overlay={userMenu}>
                        <a onClick={e => e.preventDefault()} style={dropdownLinkStyle}>
                            <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: '10px' }} />
                            {user.fullname} <DownOutlined />
                        </a>
                    </Dropdown>
                ) : (
                    <Button type="primary" style={loginButtonStyle}>
                        <Link to="/login" style={linkStyle}>Đăng nhập</Link>
                    </Button>
                )}
            </div>
            <ToastContainer />
        </Header>
    );
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#006400', 
    padding: '0 20px'
};

const logoStyle = {
    color: '#fff',
    fontSize: '24px'
};

const logoTextStyle = {
    color: '#fff',
    fontSize: '24px',
    textDecoration: 'none'
};

const dropdownLinkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

const loginButtonStyle = {
    marginRight: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default AppHeader;
