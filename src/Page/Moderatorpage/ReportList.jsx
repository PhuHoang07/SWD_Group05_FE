// ReportList.jsx
import React, { useState, useEffect } from 'react';
import { Table, Input, Modal, Button } from 'antd';
import { getAllReport } from '../../Services/reportApi';
import { getProductPostById } from '../../Services/productPostApi';
import moment from 'moment';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [searchDate, setSearchDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [productPost, setProductPost] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getAllReport(searchDate, pageIndex, pageSize);
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [pageIndex, pageSize, searchDate]);

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
      <h1>Report List</h1>
      <Input.Search
        placeholder="Search by date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        onSearch={() => setPageIndex(0)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={reports}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pageIndex + 1,
          pageSize: pageSize,
          total: reports.length,
          onChange: (page, pageSize) => {
            setPageIndex(page - 1);
            setPageSize(pageSize);
          },
        }}
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
