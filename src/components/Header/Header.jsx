import React, { useEffect } from 'react';
import { Layout, Menu, Input, Button, Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header } = Layout;
const { Search } = Input;



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
        console.log(user, user?.role, loginSuccess); // Added optional chaining for safety
        if (user && user.role && loginSuccess === "true") {
            toast.success("Đăng nhập thành công!");
            setTimeout(() => {
                localStorage.removeItem('loginSuccess'); // Delay the removal to ensure toast is shown
            }, 100); // Adjust delay as needed
        }
    }, [user]);

    const userMenu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/user-profile" style={{ textDecoration: 'none', color: '#000' }}>Your Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/view-coin-transaction" style={{ textDecoration: 'none', color: '#000' }}>View transaction</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/buyer-history" style={{ textDecoration: 'none', color: '#000' }}>Product Sell</Link>
            </Menu.Item>
            <Menu.Item key="4" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={headerStyle}>
            <div style={logoStyle}>
                <Link to="/" style={logoTextStyle}>FU GoodsExchange</Link>
            </div>
            <Menu theme="dark" mode="horizontal" style={menuStyle}>
                <Menu.Item key="2" style={searchItemStyle}>
                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        enterButton="Tìm kiếm"
                        size="large"
                        style={searchStyle}
                    />
                </Menu.Item>
            </Menu>
            <div>
                {user && user.role ? (
                    <Dropdown overlay={userMenu}>
                        <a onClick={e => e.preventDefault()} style={dropdownLinkStyle}>
                            <Avatar src="user-profile-image-url" style={{ marginRight: '10px' }} />
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
    background: '#001529',
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

const menuStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const menuItemStyle = {
    display: 'flex',
    alignItems: 'center'
};

const dropdownLinkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

const searchItemStyle = {
    padding: 0
};

const searchStyle = {
    width: '400px',
    verticalAlign: 'middle'
};

const logoutButtonStyle = {
    marginRight: '10px'
};

const loginButtonStyle = {
    marginRight: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default AppHeader;
