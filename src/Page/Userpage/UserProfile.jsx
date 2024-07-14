import React, { useState, useEffect } from 'react';
import { Container, Box, Avatar, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../Services/axios/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
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

        const fetchBlogs = async () => {
            try {
                const response = await axiosClient.get('/api/product-post/me');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const handlePostSuccess = () => {
            const fetchBlogs = async () => {
                try {
                    const response = await axiosClient.get('/api/product-post/me');
                    setBlogs(response.data);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }
            };

            fetchBlogs();
        };

        const storedSuccess = localStorage.getItem('postSuccess');
        if (storedSuccess) {
            toast.success('Bài đăng đã được tạo thành công!');
            localStorage.removeItem('postSuccess');
            handlePostSuccess();
        }
    }, []);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

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
                            <TableCell>Action</TableCell>
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
                                    <TableCell>{blog.price}</TableCell>
                                    <TableCell>{new Date(blog.createdDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{blog.status}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
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
