import React, { useState, useEffect } from "react";
import { Table, Button, message, Modal } from "antd";
import { getAllProductPostWaiting, approvePostMode } from '../../Services/productPostApi';
import moment from "moment";

const ProductPostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllProductPostWaiting();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts. Please try again later.");
    }
  };

  const handleApprove = async (postId) => {
    try {
      await approvePostMode(postId, "Open");
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
      await approvePostMode(postId, "Cancel");
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
        {selectedPost ? (
          <div>
            <p><strong>Title:</strong> {selectedPost.title}</p>
            <p><strong>Description:</strong> {selectedPost.description}</p>
            <p><strong>Price:</strong> {selectedPost.price}</p>
            <p><strong>Created Date:</strong> {moment(selectedPost.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
            <p><strong>Created By:</strong> {selectedPost.createdBy.fullName}</p>
            <p><strong>Email:</strong> {selectedPost.createdBy.email}</p>
            <p><strong>Phone Number:</strong> {selectedPost.createdBy.phoneNumber}</p>
            <p><strong>Category:</strong> {selectedPost.category}</p>
            <p><strong>Post Mode:</strong> {selectedPost.postMode}</p>
            <p><strong>Campus:</strong> {selectedPost.campus}</p>
            <p><strong>Image URLs:</strong></p>
            {selectedPost.imageUrls && selectedPost.imageUrls.length > 0 ? (
              selectedPost.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: '100%', marginBottom: 10 }} />
              ))
            ) : (
              <p>No images available</p>
            )}
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
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default ProductPostList;
