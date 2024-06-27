import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { createCategory, getAllCategory } from '../../Services/categoryApi';

const ManageCategories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Bắt đầu từ trang đầu tiên (1-based)
  const [pageSize, setPageSize] = useState(5); // Kích thước trang mặc định
  const [hasMoreData, setHasMoreData] = useState(true); // Trạng thái để kiểm tra có dữ liệu để phân trang hay không

  useEffect(() => {
    fetchCategories();
  }, [currentPage, pageSize]); // Fetch danh sách category khi currentPage hoặc pageSize thay đổi

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategory(currentPage, pageSize); // Truyền pageIndex (0-based)
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      const newCategory = await createCategory(values.name);
      message.success('Category created successfully!');
      setIsModalVisible(false);
      form.resetFields();

      // Sau khi thêm mới thành công, cập nhật lại danh sách danh mục
      fetchCategories();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        message.error('Unauthorized! Please log in.');
      } else if (error.response && error.response.status === 403) {
        message.error('Forbidden! You do not have permission to create a category.');
      } else if (error.response) {
        message.error(`Failed to create category: ${error.response.data.message}`);
      } else {
        message.error('Failed to create category!');
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleChangePage = (page) => {
    setCurrentPage(page); // Chuyển đổi về pageIndex (1-based)
  };

  const columns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} pagination={false} />
      <Modal title="Add Category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          disabled={currentPage === 1} // Vô hiệu hóa nút Back khi ở trang đầu tiên
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
