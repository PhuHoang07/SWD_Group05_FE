import React from 'react';
import { Layout, Menu, Input, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const menu = (
    <Menu>
        <Menu.Item key="1">
            <Link to="#action/3.1">Đồ điện tử</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="#action/3.2">Quần áo</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="#action/3.3">Trao đổi</Link>
        </Menu.Item>
    </Menu>
);

const AppHeader = () => {
    return (
        <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">
                <Link to="/" style={{ color: '#fff', fontSize: '24px' }}>FU GoodsExchange</Link>
            </div>
            <Menu theme="dark" mode="horizontal" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <Menu.Item key="1">
                    <Dropdown overlay={menu}>
                        <a onClick={e => e.preventDefault()} style={{ color: '#fff' }}>
                            Danh mục <DownOutlined />
                        </a>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key="2">
                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        enterButton="Search"
                        size="large"
                        style={{ width: '400px' }}
                    />
                </Menu.Item>
            </Menu>
            <div>
                <Button type="primary" style={{ marginRight: '10px' }}>
                    <Link to="/login">Đăng nhập</Link>
                </Button>
            </div>
        </Header>
    );
};

export default AppHeader;
