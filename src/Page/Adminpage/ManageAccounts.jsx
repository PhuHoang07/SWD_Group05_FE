import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Row, Col, Tag } from 'antd';
import { getAllAccount, updateAccountAdmin, deleteAccount } from '../../Services/accountApi';

const { Option } = Select;

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, roleFilter, accounts]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await getAllAccount();
      console.log('Fetched accounts:', data);
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      message.error('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = accounts;

    if (searchTerm) {
      filtered = filtered.filter(account =>
        account.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(account => account.role === roleFilter);
    }

    setFilteredAccounts(filtered);
  };

  const showModal = (account) => {
    setEditingAccount(account);
    form.setFieldsValue(account);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateAccount(editingAccount.id, values.fullname, values.email, values.phoneNumber, values.role, values.status);
      message.success('Account updated successfully');
      fetchAccounts();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to update account:', error);
      message.error('Failed to update account');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      message.success('Account deleted successfully');
      fetchAccounts();
    } catch (error) {
      console.error('Failed to delete account:', error);
      message.error('Failed to delete account');
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
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)} disabled={record.role === 'Admin'}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.role === 'Admin'}
          >
            <Button type="link" danger disabled={record.role === 'Admin'}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Search accounts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by Role"
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            style={{ width: 200 }}
          >
            <Option value="">All Roles</Option>
            <Option value="Admin">Admin</Option>
            <Option value="Moderator">Moderator</Option>
            <Option value="User">User</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredAccounts}
        pagination={{ current: currentPage, pageSize, total: filteredAccounts.length, onChange: (page, pageSize) => { setCurrentPage(page); setPageSize(pageSize); } }}
        rowKey="id"
        loading={loading}
      />

      <Modal title="Edit Account" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: 'Please input the full name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role!' }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Moderator">Moderator</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select a status!' }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAccounts;
