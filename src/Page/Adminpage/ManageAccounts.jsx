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
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      message.error('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...accounts];

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(account =>
        account.fullname.toLowerCase().includes(lowerCaseSearch) ||
        account.phoneNumber.toLowerCase().includes(lowerCaseSearch) ||
        account.email.toLowerCase().includes(lowerCaseSearch) // Thêm email vào filter
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(account => account.role === roleFilter);
    }

    setFilteredAccounts(filtered);
  };

  const showModal = (account) => {
    setEditingAccount(account);
    form.setFieldsValue({
      fullname: account.fullname,
      phoneNumber: account.phoneNumber,
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateAccountAdmin(editingAccount.id, values.fullname, values.phoneNumber);
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
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email', // Thêm cột Email vào bảng
      dataIndex: 'email',
      key: 'email',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          {record.status === 'Active' && ( // Chỉ hiển thị nút Delete khi status là Active
            <Popconfirm
              title="Are you sure to delete this account?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>Delete</Button>
            </Popconfirm>
          )}
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
        pagination={{ current: currentPage, pageSize, total: filteredAccounts.length }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
          setPageSize(pagination.pageSize);
        }}
        rowKey="id"
        loading={loading}
      />

      <Modal title="Edit Account" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: 'Please input the full name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAccounts;
