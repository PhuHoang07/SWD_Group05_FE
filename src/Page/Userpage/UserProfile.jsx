import React, { useState, useEffect } from 'react';
import { Container, Box, Avatar, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const blogs = [
    { id: 1, thumbnail: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png', title: 'React Introduction', category: 'reactjs', price: '$10.00', date: 'Jul 25, 2023', status: 'active' },
    { id: 2, thumbnail: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png', title: 'React Introduction', category: 'reactjs', price: '$10.00', date: 'Jul 25, 2023', status: 'pending' },
    { id: 3, thumbnail: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png', title: 'React Introduction', category: 'reactjs', price: '$10.00', date: 'Jul 25, 2023', status: 'rejected' },
    { id: 4, thumbnail: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png', title: 'React Introduction', category: 'reactjs', price: '$10.00', date: 'Jul 25, 2023', status: 'rejected' },
    { id: 5, thumbnail: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png', title: 'React Introduction', category: 'reactjs', price: '$10.00', date: 'Jul 25, 2023', status: 'pending' },
];



const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, bgcolor: '#f0f0f0', color: '#333', borderRadius: 1, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar alt={user.fullname} src={user.avatarUrl || "/path/to/default-avatar.jpg"} sx={{ width: 80, height: 80, mr: 2 }} />
                <Box>
                    <Typography variant="h5" fontWeight="bold">{user.fullname}</Typography>
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
                        {blogs.map((blog, index) => (
                            <TableRow key={blog.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell><img src={blog.thumbnail} alt={blog.title} width="50" /></TableCell>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.category}</TableCell>
                                <TableCell>{blog.price}</TableCell>
                                <TableCell>{blog.date}</TableCell>
                                <TableCell>{blog.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default UserProfile;
