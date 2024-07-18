import React, { useState, useEffect } from "react";
import { Typography, Divider, Row, Col, Button, Modal, Select } from "antd";
import styled from "styled-components";
import axiosClient from "../../../Services/axios/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Option } = Select;

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
  const [status, setStatus] = useState("Pending"); // Mặc định là "Pending"
  const [postModes, setPostModes] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInformation(user);
    console.log("User information from localStorage:", user);

    if (user) {
      fetchTransactions(user.id, status); // Gọi fetchTransactions với status hiện tại
    }

    // Fetch post modes
    const fetchOptions = async () => {
      try {
        const postModesResponse = await axiosClient.get('/api/post-mode/view/active');
        const sortedPostModes = postModesResponse.data.sort((a, b) => a.id - b.id);
        setPostModes(sortedPostModes);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, [status]);

  const fetchTransactions = async (userId, status) => {
    try {
      const response = await axiosClient.get(
        `/api/product-post/me?status=${status}`
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

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); // Cập nhật status khi người dùng chọn
  };

  const handlePostModeClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
  try {
    const response = await axiosClient.put(
      `/api/product-post/extend/${selectedTransaction.id}`,
      JSON.stringify(selectedMode),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Extend product response:", response);
    fetchTransactions(userInformation.id, status);
    
    setModalVisible(false);
  } catch (error) {
    console.error("Error extending product:", error);
  }
};


  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <StyledPostApplyDetails>
      <Title level={3} style={{ textAlign: "center" }}>
        {status === "Pending" ? "Pending Transactions" : "Expired Transactions"}
      </Title>
      <Divider />

      {transactions.length === 0 ? (
        <Paragraph>No {status.toLowerCase()} transactions found.</Paragraph>
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
                            width: "50%",
                            height: "50%",
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
                    <strong>Date:</strong>{" "}
                    {new Date(transaction.expiredDate).toLocaleString()}
                  </Paragraph>
                  {transaction.status === "Expired" && (
                    <Button type="primary" onClick={() => handlePostModeClick(transaction)}>
                      Post Mode
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <Divider />
          </div>
        ))
      )}

      <Modal
        title="Select Post Mode"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select a Post Mode"
          onChange={value => setSelectedMode(value)}
        >
          {postModes.map(mode => (
            <Option key={mode.id} value={mode.id}>{mode.type}</Option>
          ))}
        </Select>
      </Modal>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type={status === "Pending" ? "default" : "primary"}
          onClick={() => handleStatusChange("Pending")}
          style={{ marginRight: "10px" }}
        >
          Pending
        </Button>
        <Button
          type={status === "Expired" ? "default" : "primary"}
          onClick={() => handleStatusChange("Expired")}
        >
          Expired
        </Button>
      </div>
    </StyledPostApplyDetails>
  );
};

export default PostApplyDetailsHistory;
