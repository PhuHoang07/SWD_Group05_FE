import React, { useState, useEffect } from "react";
import { Typography, Divider, Row, Col, Button } from "antd";
import styled from "styled-components";
import axiosClient from "../../../Services/axios/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const StyledPostApplyDetails = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const PostApplyDetailsHistory = () => {
  const [userInformation, setUserInformation] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInformation(user);
    console.log("User information from localStorage:", user);

    if (user) {
      fetchTransactions(user.id);
    }
  }, []);

  const fetchTransactions = async (userId) => {
    try {
      const response = await axiosClient.get(
        `/api/product-post/me?status=Pending`
      );
      console.log("API response:", response);

      if (response && response.data) {
        setTransactions(response.data);
        console.log("Transactions set:", response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };

  return (
    <StyledPostApplyDetails>
      <Title level={3} style={{ textAlign: "center" }}>
        Pending Transactions
      </Title>
      <Divider />

      {transactions.length === 0 ? (
        <Paragraph>No pending transactions found.</Paragraph>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id}>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ overflow: "hidden", borderRadius: "5px" }}>
                  <Slider {...settings}>
                    {transaction.imageUrls.map((imageUrl, index) => (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt={transaction.id}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Col>
              <Col span={16}>
                <div style={{ paddingLeft: "20px" }}>
                  <Title level={4}>{transaction.title}</Title>
                  <Paragraph>
                    <strong>Transaction ID:</strong> {transaction.id}
                  </Paragraph>
                  <Paragraph>
                    <strong>Description:</strong> {transaction.description}
                  </Paragraph>
                  <Paragraph>
                    <strong>Category:</strong> {transaction.category}
                  </Paragraph>
                  <Paragraph>
                    <strong>Campus:</strong> {transaction.campus}
                  </Paragraph>
                  <Paragraph>
                    <strong>Price:</strong> {transaction.price}
                  </Paragraph>
                  <Paragraph>
                    <strong>Date:</strong> {new Date(transaction.expiredDate).toLocaleString()}
                  </Paragraph>
                  {transaction.id && (
                    <Link to={`/post-apply-details/${transaction.id}`}>
                      View Details
                    </Link>
                  )}
                </div>
              </Col>
            </Row>
            <Divider />
          </div>
        ))
      )}
    </StyledPostApplyDetails>
  );
};

export default PostApplyDetailsHistory;
