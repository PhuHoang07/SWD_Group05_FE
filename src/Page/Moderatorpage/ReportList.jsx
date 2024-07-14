import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, Row, Col } from 'antd';
import { getAllReport } from '../../Services/reportApi';
import { getProductPostById } from '../../Services/productPostApi';
import moment from 'moment';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [productPost, setProductPost] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getAllReport();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      message.error('Failed to fetch reports!');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductPostDetails = async (id) => {
    setLoading(true);
    try {
      const data = await getProductPostById(id);
      setProductPost(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to fetch product post details:', error);
      message.error('Failed to fetch product post details!');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => fetchProductPostDetails(record.productPostId)}>Detail</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 6 }}
      />
      <Modal
        title="Product Post Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {productPost ? (
          <div>
            <p><strong>Title:</strong> {productPost.title}</p>
            <p><strong>Description:</strong> {productPost.description}</p>
            <p><strong>Price:</strong> {productPost.price}</p>
            <p><strong>Created Date:</strong> {moment(productPost.createdDate).format('DD-MM-YYYY HH:mm:ss')}</p>
            <p><strong>Created By:</strong> {productPost.createdBy.fullName}</p>
            <p><strong>Email:</strong> {productPost.createdBy.email}</p>
            <p><strong>Phone Number:</strong> {productPost.createdBy.phoneNumber}</p>
            <p><strong>Category:</strong> {productPost.category}</p>
            <p><strong>Post Mode:</strong> {productPost.postMode}</p>
            <p><strong>Campus:</strong> {productPost.campus}</p>
            <p><strong>Image URLs:</strong></p>
            {productPost.imageUrls.length > 0 ? (
              productPost.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: '100%', marginBottom: 10 }} />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default ReportList;