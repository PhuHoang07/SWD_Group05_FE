import React, { useEffect } from 'react';
import { Layout, Menu, Input, Button, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header } = Layout;
const { Search } = Input;

const menu = (
    <Menu>
        <Menu.Item key="1">
            <Link to="#action/3.1" style={{ textDecoration: 'none', color: '#000' }}>Đồ điện tử</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="#action/3.2" style={{ textDecoration: 'none', color: '#000' }}>Quần áo</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="#action/3.3" style={{ textDecoration: 'none', color: '#000' }}>Trao đổi</Link>
        </Menu.Item>
    </Menu>
);

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
        if (user && user.role) {
            toast.success("Đăng nhập thành công!");
        }
    }, [user]);

    return (
        <Header style={headerStyle}>
            <div style={logoStyle}>
                <Link to="/" style={logoTextStyle}>FU GoodsExchange</Link>
            </div>
            <Menu theme="dark" mode="horizontal" style={menuStyle}>
                <Menu.Item key="1" style={menuItemStyle}>
                    <Dropdown overlay={menu}>
                        <a onClick={e => e.preventDefault()} style={dropdownLinkStyle}>
                            Danh mục <DownOutlined />
                        </a>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key="2" style={searchItemStyle}>
                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        enterButton="Search"
                        size="large"
                        style={searchStyle}
                    />
                </Menu.Item>
            </Menu>
            <div>
                {user && user.role ? (
                    <Button type="primary" style={logoutButtonStyle} onClick={handleLogout}>
                        Log Out
                    </Button>
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
