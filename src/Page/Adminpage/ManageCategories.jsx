import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Row, Col } from 'antd';
import { createCategory, getAllCategory, deleteCategory, updateCategory } from '../../Services/categoryApi';

const ManageCategories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(5); 
  const [hasMoreData, setHasMoreData] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    fetchCategories();
  }, [currentPage, pageSize, searchTerm]); 

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategory(currentPage, pageSize, searchTerm); 
      if (categoriesData.length > 0) {
        setCategories(categoriesData);
        setHasMoreData(true);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      message.error('Failed to fetch categories!');
    }
  };

  const showModal = (category = null) => {
    if (category) {
      form.setFieldsValue({ name: category.name });
      setCurrentCategoryId(category.id);
      setIsEditMode(true);
    } else {
      form.resetFields();
      setCurrentCategoryId(null);
      setIsEditMode(false);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEditMode) {
        await updateCategory(currentCategoryId, values.name);
        message.success('Category updated successfully!');
      } else {
        await createCategory(values.name);
        message.success('Category created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Unauthorized! Please log in.');
      } else if (error.response && error.response.status === 403) {
        message.error('Forbidden! You do not have permission to create or update a category.');
      } else if (error.response) {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} category: ${error.response.data.message}`);
      } else {
        message.error(`Failed to ${isEditMode ? 'update' : 'create'} category!`);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      message.error('Failed to delete category!');
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page); 
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    fetchCategories();
  };

  const columns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
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
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Search categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
              <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Category
      </Button>
      </Row>

      <Table columns={columns} dataSource={categories} pagination={false} />
      <Modal
        title={isEditMode ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Button
          disabled={currentPage === 1} 
          onClick={() => handleChangePage(currentPage - 1)}
          style={{ marginRight: 8 }}
        >
          Back
        </Button>
        <Button onClick={() => handleChangePage(currentPage + 1)} disabled={!hasMoreData}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ManageCategories;
