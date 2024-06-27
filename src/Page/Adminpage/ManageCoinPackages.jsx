import React from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';

const ManageCoinPackages = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log(values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Coins',
      dataIndex: 'coins',
      key: 'coins',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Package 1',
      price: '$10',
      coins: 100,
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Coin Package
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal title="Add Coin Package" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Package Name" rules={[{ required: true, message: 'Please input the package name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="coins" label="Coins" rules={[{ required: true, message: 'Please input the number of coins!' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCoinPackages;
