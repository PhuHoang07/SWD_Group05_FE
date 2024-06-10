import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import './Header.css'

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">FU GoodsExchange</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Đồ điện tử</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Quần áo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Trao đổi</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex flex-grow-1 justify-content-center">
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm sản phẩm"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>               
                    <Nav>
                        <button className='btn-login'><Link to="/login">Đăng nhập/Đăng ký</Link></button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;