import React, { useState, useEffect } from "react";
import { Typography, Divider, Row, Col, Button, Space } from "antd";
import styled from "styled-components";
import axiosClient from "../../../Services/axios/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [statusFilter, setStatusFilter] = useState("Pending"); // Default filter to Pending

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInformation(user);
    console.log("User information from localStorage:", user);

    if (user) {
      fetchTransactions(user.id, statusFilter);
    }
  }, [statusFilter]);

  const fetchTransactions = async (userId, status) => {
    try {
      const response = await axiosClient.get(
        `/api/product-transaction/me?status=${status}`
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

  const handleCancelTransaction = async (transactionId) => {
    console.log("Cancelling transaction with ID:", transactionId);
    try {
      const response = await axiosClient.delete(
        `/api/product-transaction/${transactionId}`
      );
      console.log("Cancel response:", response);

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.responseModel.id !== transactionId)
      );

      toast.success("Transaction cancelled successfully.");
      fetchTransactions(userInformation.id, statusFilter); // Load transactions again after successful cancellation
    } catch (error) {
      console.error("Error cancelling transaction:", error);
      toast.error("Failed to cancel the transaction.");
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
        {statusFilter === "Pending" ? "Pending Transactions" : "Success Transactions"}
      </Title>
      <Divider />

      <Space size="middle">
        <Button
          type={statusFilter === "Pending" ? "primary" : "default"}
          onClick={() => setStatusFilter("Pending")}
        >
          Pending
        </Button>
        <Button
          type={statusFilter === "Success" ? "primary" : "default"}
          onClick={() => setStatusFilter("Success")}
        >
          Success
        </Button>
      </Space>

      <Divider />

      {transactions.length === 0 ? (
        <Paragraph>No {statusFilter.toLowerCase()} transactions found.</Paragraph>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.responseModel.id}>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ overflow: "hidden", borderRadius: "5px" }}>
                  <Slider {...settings}>
                    {transaction.responseModel.imageUrls.map((imageUrl, index) => (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt={transaction.responseModel.id}
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
                  <Title level={4}>{transaction.responseModel.Title}</Title>
                  <Paragraph>
                    <strong>Transaction ID:</strong> {transaction.responseModel.id}
                  </Paragraph>
                  <Paragraph>
                    <strong>Description:</strong> {transaction.responseModel.description}
                  </Paragraph>
                  <Paragraph>
                    <strong>Category:</strong> {transaction.responseModel.category}
                  </Paragraph>
                  <Paragraph>
                    <strong>Campus:</strong> {transaction.responseModel.campus}
                  </Paragraph>
                  <Paragraph>
                    <strong>Price:</strong> {transaction.responseModel.price}
                  </Paragraph>
                  <Paragraph>
                    <strong>Transaction Date:</strong>{" "}
                    {new Date(transaction.transactAt).toLocaleString()}
                  </Paragraph>
                  {transaction.responseModel.createdBy && (
                    <div>
                      <Title level={5}>Seller Information</Title>
                      <Paragraph>
                        <strong>Name:</strong> {transaction.responseModel.createdBy.fullName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Email:</strong> {transaction.responseModel.createdBy.email}
                      </Paragraph>
                      <Paragraph>
                        <strong>Phone Number:</strong> {transaction.responseModel.createdBy.phoneNumber}
                      </Paragraph>
                    </div>
                  )}
                  {statusFilter === "Pending" && (
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleCancelTransaction(transaction.responseModel.id)}
                    >
                      Cancel
                    </Button>
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
