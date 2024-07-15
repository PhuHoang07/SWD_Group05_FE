import React, { useState } from "react";
import { Modal, Button, Checkbox } from "antd";
import "./PostApplyDetails.css";

const PostApplyDetails = () => {
  const [postApplies] = useState([
    {
      id: 1,
      message: "I'm interested in this post.",
      buyerInfo: {
        name: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "123-456-7890",
      },
    },
    {
      id: 2,
      message: "Could you provide more details?",
      buyerInfo: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        phoneNumber: "987-654-3210",
      },
    },
    {
      id: 3,
      message: "I would like to negotiate the price.",
      buyerInfo: {
        name: "Mike Johnson",
        email: "mikejohnson@example.com",
        phoneNumber: "456-789-0123",
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckboxChange = (id) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    // Handle closing the post logic here
    setLoading(true);
    try {
      // Simulate API request
      setTimeout(() => {
        setLoading(false);
        setSelectedIds([]);
      }, 1500);
    } catch (error) {
      console.error("Failed to close the post:", error.message);
      setError("Failed to close the post.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <div className="post-apply-details">Loading...</div>;
  }

  if (error) {
    return <div className="post-apply-details">{error}</div>;
  }

  if (postApplies.length === 0) {
    return <div className="post-apply-details">No post applies found.</div>;
  }

  return (
    <div className="post-apply-details">
      <h2>Post Applies Details</h2>
      <div className="post-apply-list">
        {postApplies.map((apply) => (
          <div key={apply.id} className="apply-item">
            <Checkbox
              onChange={() => handleCheckboxChange(apply.id)}
              checked={selectedIds.includes(apply.id)}
            />
            {apply.message && (
              <p>
                <strong>Message:</strong> {apply.message}
              </p>
            )}
            {apply.buyerInfo && (
              <>
                <p>
                  <strong>Buyer Name:</strong> {apply.buyerInfo.name}
                </p>
                <p>
                  <strong>Email:</strong> {apply.buyerInfo.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {apply.buyerInfo.phoneNumber}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      <Button onClick={showModal} className="close-post-button">
        Close Post
      </Button>
      <Modal
        title="Confirm Close Post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to close this post?</p>
      </Modal>
    </div>
  );
};

export default PostApplyDetails;
