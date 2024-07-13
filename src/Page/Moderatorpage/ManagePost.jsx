import React, { useState } from "react";
import { Table, Button, message, Modal } from "antd";

const ProductPostList = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
      title: 'Tài Liệu SV',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      campus: 'Hồ Chí Minh',
      seller: 'Nguyễn Văn A',
    },
    {
      id: 2,
      imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
      title: 'Tài Liệu SV',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      campus: 'Hà Nội',
      seller: 'Trần Thị B',
    },
    {
      id: 3,
      imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
      title: 'Tài Liệu SV',
      description: 'Description of Car 1',
      price: '$10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      campus: 'Đà Nẵng',
      seller: 'Phạm Văn C',
    },
  ]);
  const [showHeader, setShowHeader] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleApprove = async (postId) => {
    try {
      message.success("Post approved successfully!");
      setPosts(posts.filter((post) => post.id !== postId));
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error approving post:", error);
      message.error("Failed to approve post. Please try again later.");
    }
  };

  const handleReject = async (postId) => {
    try {
      message.success("Post rejected successfully!");
      setPosts(posts.filter((post) => post.id !== postId));
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error rejecting post:", error);
      message.error("Failed to reject post. Please try again later.");
    }
  };

  const showDetails = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => showDetails(record)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={posts} columns={columns} rowKey="id" />
      <Modal
        title="Post Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPost && (
          <div>
            <h2>{selectedPost.title}</h2>
            <img src={selectedPost.imageUrl} alt={selectedPost.title} style={{ width: '100%', marginBottom: 16 }} />
            <p><strong>Description:</strong> {selectedPost.description}</p>
            <p><strong>Price:</strong> {selectedPost.price}</p>
            <p><strong>Features:</strong></p>
            <ul>
              {selectedPost.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p><strong>Campus:</strong> {selectedPost.campus}</p>
            <p><strong>Seller:</strong> {selectedPost.seller}</p>
            <Button
              type="primary"
              onClick={() => handleApprove(selectedPost.id)}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
            <Button type="danger" onClick={() => handleReject(selectedPost.id)}>
              Reject
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductPostList;
