import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Row, Col, Select, Tag } from 'antd';
import { getAllCoinPack, createCoinPack, updateCoinPack, deleteCoinPack } from '../../Services/coinPackageApi';

const { Option } = Select;

const ManageCoinPacks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [coinPacks, setCoinPacks] = useState([]);
  const [currentCoinPackId, setCurrentCoinPackId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoinPacks();
  }, []);

  const fetchCoinPacks = async () => {
    setLoading(true);
    try {
      const coinPacksData = await getAllCoinPack();
      setCoinPacks(coinPacksData);
    } catch (error) {
      console.error('Failed to fetch coin packs:', error);
      message.error('Failed to fetch coin packs!');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (coinPack = null) => {
    if (coinPack) {
      form.setFieldsValue({ coinAmount: coinPack.coinAmount, price: coinPack.price, status: coinPack.status });
      setCurrentCoinPackId(coinPack.id);
      setIsEditMode(true);
    } else {
      form.resetFields();
      setCurrentCoinPackId(null);
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEditMode) {
        await updateCoinPack(currentCoinPackId, values.coinAmount, values.price, values.status);
        message.success('Coin pack updated successfully!');
      } else {
        await createCoinPack(values.coinAmount, values.price);
        message.success('Coin pack created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchCoinPacks();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Unauthorized! Please log in.');
      } else if (error.response && error.response.status === 403) {
        message.error('Forbidden! You do not have permission to create or update a coin pack.');
      } else if (error.response) {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} coin pack: ${error.response.data.message}`);
      } else {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} coin pack!`);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoinPack([id]);
      message.success('Coin pack deleted successfully!');
      fetchCoinPacks();
    } catch (error) {
      console.error('Failed to delete coin pack:', error);
      message.error('Failed to delete coin pack!');
    }
  };

  const getStatusTag = (status) => {
    if (status === 'Active') {
      return <Tag color="green">{status}</Tag>;
    } else if (status === 'Inactive') {
      return <Tag color="red">{status}</Tag>;
    }
    return <Tag>{status}</Tag>;
  };

  const columns = [
    { title: 'Coin Amount', dataIndex: 'coinAmount', key: 'coinAmount' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} VNĐ`,
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
            title="Are you sure to delete this coin pack?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.status === 'Inactive'}
          >
            <Button type="link" danger disabled={record.status === 'Inactive'}>
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
            Add Coin Pack
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={coinPacks} rowKey="id" loading={loading} />

      <Modal
        title={isEditMode ? 'Edit Coin Pack' : 'Add Coin Pack'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="coinAmount"
            label="Coin Amount"
            rules={[{ required: true, message: 'Please input the coin amount!' }]}
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
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCoinPacks;
