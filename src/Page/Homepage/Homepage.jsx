import React from 'react';
import { Carousel, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';

const Homepage = () => {
  const sliderImages = [
    'https://daihoc.fpt.edu.vn/wp-content/uploads/2020/02/web-banner-1920x550.jpg',
    'https://microsoft.fptcloud.com/wp-content/uploads/2023/11/FPT-Smart-Cloud-Blog-Post-BR8-1.png',
    'https://csmovietnam.com/wp-content/uploads/2023/08/banner-website-1920-x-900px-2.png',
  ];

  const cardsData = [
    {
      id: 1,
      imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
      title: 'Tài Liệu SV',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      Campus: 'Hồ Chí Minh',
      Seller: 'Nguyễn Văn A',
      Phone : '0123456789',
    },
    {
      id: 2,
      imageUrl: 'https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg',
      title: 'Tài liệu prj',
      description: 'Description of Car 2',
      price: '$20,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      Campus: 'Cần Thơ',
      Seller: 'Trần Văn B',
      Phone : '0123456789',
    },
    {
      id: 3,
      imageUrl: 'https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg',
      title: 'Bang mach dien tu',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      Campus: 'Hồ Chí Minh',
      Seller: 'Lê Văn C',
      Phone : '0123456789',
    },
    {
      id: 4,
      imageUrl: 'https://library.fpt.edu.vn/Uploads/HN/Images/Catalogue/FPT190025804.png',
      title: 'Sach kanji co ban',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      Campus: 'Hà Nội',
      Seller: 'Nguyễn Văn D',
      Phone : '0123456789',
    },
    {
      id: 5,
      imageUrl: 'https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg',
      title: 'Ao fpt',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      Campus: 'Đà Nẵng',
      Seller: 'Nguyễn Văn E',
      Phone : '0123456789',
    },
    {
      id: 6,
      imageUrl: 'https://cf.shopee.vn/file/vn-11134201-23020-ju297ru31snvf7',
      title: 'Đồng phục võ FPT',
      description: 'Mình có bộ đồ võ size 160 , bạn nào cần thì inb mình cho nhé.',
      price: '$10,000',
      features: ['Đã sử dụng', 'Cả nam và nữ'],
      Campus: 'Hồ Chí Minh',
      Seller: 'Nguyễn Gia Huy',
      Phone : '0123456789',
    },
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
                    cover={<img alt={card.title} src={card.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />}
                  >
                    <Card.Meta title={card.title} description={card.description} />
                    <p className="card-price" style={{ marginTop: '10px', fontWeight: 'bold' }}>{card.price}</p>
                    <div className="card-features">
                      {card.features.map((feature, idx) => (
                        <span key={idx} className="card-feature" style={{ display: 'block' }}>{feature}</span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
