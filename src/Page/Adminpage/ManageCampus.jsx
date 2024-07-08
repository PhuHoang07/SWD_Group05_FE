import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { createCampus, getAllCampus, deleteCampus, updateCampus } from '../../Services/campusApi';

const ManageCampus = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [campuses, setCampuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCampuses, setTotalCampuses] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampuses();
  }, [currentPage, pageSize, searchTerm]);

  const fetchCampuses = async () => {
    setLoading(true);
    try {
      const { data, total } = await getAllCampus(currentPage - 1, pageSize, searchTerm);
      setCampuses(data);
      setTotalCampuses(total);
    } catch (error) {
      console.error('Failed to fetch campuses:', error);
      message.error('Failed to fetch campuses!');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (campus = null) => {
    if (campus) {
      form.setFieldsValue({ name: campus.name });
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode) {
        await updateCampus(campuses[currentPage - 1].id, values.name);
        message.success('Campus updated successfully!');
      } else {
        await createCampus(values.name);
        message.success('Campus created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchCampuses();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        message.error('Unauthorized! Please log in.');
      } else if (error.response && error.response.status === 403) {
        message.error('Forbidden! You do not have permission to create or update a campus.');
      } else if (error.response) {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} campus: ${error.response.data.message}`);
      } else {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} campus!`);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCampus(id);
      message.success('Campus deleted successfully!');
      fetchCampuses();
    } catch (error) {
      console.error('Failed to delete campus:', error);
      message.error('Failed to delete campus!');
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const columns = [
    { title: 'Campus Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this campus?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16, marginLeft: 16 }}>
        Add Campus
      </Button>
      {/* <Input.Search
        placeholder="Search campuses"
        onSearch={handleSearch}
        style={{ marginBottom: 16, marginLeft: 16, width: 300 }}
      /> */}

      <Table
        columns={columns}
        dataSource={campuses}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCampuses,
          onChange: handleChangePage,
        }}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={isEditMode ? 'Edit Campus' : 'Add Campus'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Campus Name"
            rules={[{ required: true, message: 'Please input the campus name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCampus;
