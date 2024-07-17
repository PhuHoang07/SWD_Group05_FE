import React, { useState, useEffect } from 'react';
import { Container, Box, Avatar, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../Services/axios/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import { Tag } from 'antd'; // Importing Ant Design Tag component

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [status, setStatus] = useState('Waiting'); // Default status
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async (userId) => {
            try {
                const response = await axiosClient.get(`/api/user/view/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            fetchUserData(storedUser.id);
        }
    }, []);

    useEffect(() => {
        fetchBlogs(pageIndex, status); // Fetch blogs when pageIndex or status changes
    }, [pageIndex, status]);

    const fetchBlogs = async (pageIndex, status, title = '', category = '', campus = '', orderPriceDescending = false, orderDateDescending = false) => {
        try {
            const response = await axiosClient.get(`/api/product-post/me`, {
                params: {
                    pageIndex,
                    title,
                    category,
                    campus,
                    orderPriceDescending,
                    orderDateDescending,
                    status,
                },
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleDelete = async (blogId) => {
        try {
            // Implement delete logic here
            toast.success('Đã xóa bài đăng thành công!');
            // Reload blogs after successful delete
            fetchBlogs(pageIndex, status);
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Đã xảy ra lỗi khi xóa bài đăng. Vui lòng thử lại sau.');
        }
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    const handleChangePage = (event, value) => {
        setPageIndex(value); // Handle page change
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value); // Handle status change
    };

    const getStatusTag = (status) => {
        if (status === 'Waiting') {
            return <Tag color="yellow">{status}</Tag>;
        } else if (status === 'Open') {
            return <Tag color="green">{status}</Tag>;
        } else if (status === 'Close') {
            return <Tag color="red">{status}</Tag>;
        }
        return <Tag>{status}</Tag>;
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VNĐ';
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, bgcolor: '#f0f0f0', color: '#333', borderRadius: 1, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar alt={user.fullName} src={user.avatarUrl || "/path/to/default-avatar.jpg"} sx={{ width: 80, height: 80, mr: 2 }} />
                <Box>
                    <Typography variant="h5" fontWeight="bold">{user.fullName}</Typography>
                    <Typography>{user.email}</Typography>
                    <Typography>Balance: {user.balance}</Typography>
                    <Typography>Total Blogs: {blogs.length}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => navigate('/create-post')}>Đăng bài</Button>
                <Button variant="contained" color="secondary" onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-select"
                        value={status}
                        label="Status"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value="Waiting">Chờ duyệt</MenuItem>
                        <MenuItem value="Open">Mở</MenuItem>
                        <MenuItem value="Closed">Đóng</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    count={10} // Total pages (dummy data)
                    page={pageIndex}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
            <TableContainer component={Paper} sx={{ bgcolor: '#ffffff', color: '#333' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">Chưa có bài viết</TableCell>
                            </TableRow>
                        ) : (
                            blogs.map((blog, index) => (
                                <TableRow key={blog.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell><img src={blog.imageUrls[0]} alt={blog.title} width="50" /></TableCell>
                                    <TableCell>{blog.title}</TableCell>
                                    <TableCell>{blog.category}</TableCell>
                                    <TableCell>{formatPrice(blog.price)}</TableCell>
                                    <TableCell>{new Date(blog.createdDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{getStatusTag(blog.status)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserProfile;
