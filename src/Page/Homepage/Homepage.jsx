import React, { useState, useEffect } from 'react';
import { Carousel, Card, Col, Row, Button, Input, Modal, Select, Form } from 'antd';
import { Link } from 'react-router-dom';
import axiosClient from '../../Services/axios/config';
import Pagination from '@mui/material/Pagination';
import { Container, Box, Typography } from '@mui/material';

import './Home.css';

const { Option } = Select;

const Homepage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    campus: '',
    orderPriceDescending: false,
    orderDateDescending: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCardsData(pageIndex, searchQuery, filter);
  }, [pageIndex, searchQuery, filter]);

  const fetchCardsData = async (pageIndex, searchQuery, filter) => {
    try {
      const { category, campus, orderPriceDescending, orderDateDescending } = filter;
      const response = await axiosClient.get(`/api/product-post/others`, {
        params: {
          pageIndex,
          title: searchQuery,
          category,
          campus,
          orderPriceDescending,
          orderDateDescending,
          status: 'Waiting', // Default status
        },
      });

      let data = response.data;

      // Chuyển đổi giá trị price từ chuỗi sang số
      data = data.map(item => ({
        ...item,
        price: parseFloat(item.price.replace(/,/g, ''))
      }));

      // Sắp xếp dữ liệu theo giá nếu cần thiết
      if (orderPriceDescending) {
        data.sort((a, b) => b.price - a.price);
      } else {
        data.sort((a, b) => a.price - b.price);
      }

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching cards data:', error);
    }
  };

  const sliderImages = [
    'https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg',
    'https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png',
    'https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png',
  ];

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VNĐ';
  };

  const handleChangePage = (event, value) => {
    setPageIndex(value);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchCardsData(1, searchQuery, filter);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleSearch();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, bgcolor: '#f0f0f0', color: '#333', borderRadius: 1, p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Carousel autoplay>
          {sliderImages.map((url, index) => (
            <div key={index} className="slider-image-container">
              <img src={url} alt={`Slide ${index + 1}`} className="slider-image" style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </Carousel>
      </Box>
      <Box className="search-container">
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Box className="search-buttons">
          <Button type="primary" onClick={showModal}>
            Filter
          </Button>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <Row gutter={[16, 16]}>
        {cardsData.length === 0 ? (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography>Không có sản phẩm</Typography>
          </Col>
        ) : (
          cardsData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Link to={`/product-details/${card.id}`} state={{ card }} style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  cover={<img alt={card.title} src={card.imageUrls[0]} style={{ height: '200px', objectFit: 'cover' }} />}
                >
                  <Card.Meta title={card.title} description={card.description} />
                  <p className="card-price" style={{ marginTop: '10px', fontWeight: 'bold' }}>{formatPrice(card.price)}</p>
                  <p className="card-category" style={{ marginTop: '10px' }}>{card.category}</p>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
      <Box sx={{ mt: 4 }}>
        <Pagination
          count={10} // Total pages (dummy data)
          page={pageIndex}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <Modal title="Filter" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Category">
            <Input
              placeholder="Category"
              value={filter.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Campus">
            <Input
              placeholder="Campus"
              value={filter.campus}
              onChange={(e) => handleFilterChange('campus', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Order by Price">
            <Select
              placeholder="Order by Price"
              value={filter.orderPriceDescending ? 'desc' : 'asc'}
              onChange={(value) => handleFilterChange('orderPriceDescending', value === 'desc')}
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order by Date">
            <Select
              placeholder="Order by Date"
              value={filter.orderDateDescending ? 'desc' : 'asc'}
              onChange={(value) => handleFilterChange('orderDateDescending', value === 'desc')}
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default Homepage;
