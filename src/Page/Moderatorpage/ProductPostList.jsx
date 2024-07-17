import React, { useState, useEffect } from "react";
import { Table, Button, message, Modal, Pagination } from "antd";
import { getAllProductPostWaiting, approvePostMode } from '../../Services/productPostApi';
import moment from "moment";

const ProductPostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(1); // Sử dụng pageIndex để phân trang

  useEffect(() => {
    fetchPosts(pageIndex); // Gọi fetchPosts khi pageIndex thay đổi
  }, [pageIndex]);

  const fetchPosts = async (page) => {
    try {
      const data = await getAllProductPostWaiting(page); // Pass pageIndex to API call
      console.log("Fetched posts data:", data); // Kiểm tra data từ API đã fetch đúng
      setPosts(data); // Cập nhật dữ liệu posts từ API vào state
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts. Please try again later.");
    }
  };

  const handleApprove = async (postId) => {
    try {
      await approvePostMode(postId, "Open");
      message.success("Post approved successfully!");
      setPosts(posts.filter((post) => post.id !== postId)); // Xóa post đã được approve
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error approving post:", error);
      message.error("Failed to approve post. Please try again later.");
    }
  };

  const showDetails = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page) => {
    setPageIndex(page); // Xử lý sự kiện khi chuyển trang
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title", // Tên trường trong dataSource
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description", // Tên trường trong dataSource
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
      <Table dataSource={posts} columns={columns} rowKey="id" pagination={false} />
      <Pagination
        current={pageIndex}
        total={100} // Tổng số bài đăng (tạm thời)
        pageSize={10} // Số lượng bài đăng trên mỗi trang
        onChange={handlePageChange}
      />
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