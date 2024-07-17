import React, { useState, useEffect } from 'react';
import { Carousel, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import axiosClient from '../../Services/axios/config';

import './Home.css';

const Homepage = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await axiosClient.get('/api/product-post/others');
        setCardsData(response.data);
      } catch (error) {
        console.error('Error fetching cards data:', error);
      }
    };

    fetchCardsData();
  }, []);

 const sliderImages = [
    'https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg',
    'https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png',
    'https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png',
  ];

  return (
    <div className="home-container" style={{ padding: '20px' }}>
      <div className="content-container">
        <div className="slider-container" style={{ marginBottom: '20px' }}>
          <Carousel autoplay>
            {sliderImages.map((url, index) => (
              <div key={index} className="slider-image-container">
                <img src={url} alt={`Slide ${index + 1}`} className="slider-image" style={{ width: '100%' }} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="shopping-cards-container">
          <Row gutter={[16, 16]}>
            {cardsData.map((card, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/product-details/${card.id}`} state={{ card }} style={{ textDecoration: 'none' }}>
                  <Card
                    hoverable
                    cover={<img alt={card.title} src={card.imageUrls[0]} style={{ height: '200px', objectFit: 'cover' }} />}
                  >
                    <Card.Meta title={card.title} description={card.description} />
                    <p className="card-price" style={{ marginTop: '10px', fontWeight: 'bold' }}>{card.price} VNĐ</p>
                    <p className="card-category" style={{ marginTop: '10px' }}>{card.category}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
