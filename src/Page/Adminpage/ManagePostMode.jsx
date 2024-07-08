import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Row, Col, Select, Tag } from 'antd';
import { getAllPostMode, createPostMode, updatePostMode, deletePostMode } from '../../Services/postModeApi';

const { Option } = Select;

const ManagePostMode = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [postModes, setPostModes] = useState([]);
  const [currentPostModeId, setCurrentPostModeId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPostModes();
  }, []);

  const fetchPostModes = async () => {
    setLoading(true);
    try {
      const postModesData = await getAllPostMode();
      setPostModes(postModesData);
    } catch (error) {
      console.error('Failed to fetch post modes:', error);
      message.error('Failed to fetch post modes!');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (postMode = null) => {
    if (postMode) {
      form.setFieldsValue({ type: postMode.type, duration: postMode.duration, price: postMode.price, status: postMode.status });
      setCurrentPostModeId(postMode.id);
      setIsEditMode(true);
    } else {
      form.resetFields();
      setCurrentPostModeId(null);
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEditMode) {
        await updatePostMode(currentPostModeId, values.type, values.duration, values.price, values.status);
        message.success('Post mode updated successfully!');
      } else {
        await createPostMode(values.type, values.duration, values.price);
        message.success('Post mode created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchPostModes();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Unauthorized! Please log in.');
      } else if (error.response && error.response.status === 403) {
        message.error('Forbidden! You do not have permission to create or update a post mode.');
      } else if (error.response) {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} post mode: ${error.response.data.message}`);
      } else {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} post mode!`);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deletePostMode([id]);
      message.success('Post mode deleted successfully!');
      fetchPostModes();
    } catch (error) {
      console.error('Failed to delete post mode:', error);
      message.error('Failed to delete post mode!');
    }
  };

  const getStatusTag = (status) => {
    if (status === true) {
      return <Tag color="green">Active</Tag>;
    } else if (status === false) {
      return <Tag color="red">Inactive</Tag>;
    }
    return <Tag>{status}</Tag>;
  };

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} xu`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this post mode?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={!record.status}
          >
            <Button type="link" danger disabled={!record.status}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
            Add Post Mode
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={postModes} rowKey="id" loading={loading} />

      <Modal
        title={isEditMode ? 'Edit Post Mode' : 'Add Post Mode'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please input the duration!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input />
          </Form.Item>
          {isEditMode && (
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePostMode;
