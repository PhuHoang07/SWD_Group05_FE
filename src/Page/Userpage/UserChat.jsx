import React from 'react';
import { Container, Grid, Paper, Typography, IconButton, Avatar, Menu, MenuItem, TextField, InputAdornment, Button, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const conversations = [
    {
        id: 1,
        name: 'Đức Nguyễn',
        lastMessage: 'Áo FPT,',
        time: '4 ngày trước',
        imageUrl: '/path/to/avatar.jpg',
        active: true,
        price: '130.000 đ',
    },
    {
        id: 2,
        name: 'Đức Nguyễn',
        lastMessage: 'Balo FPT,',
        time: '4 ngày trước',
        imageUrl: '/path/to/avatar.jpg',
        active: true,
        price: '130.000 đ',
    },
];

const UserChat = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ height: '100vh', overflow: 'auto', p: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Nhập ít nhất 3 ký tự để bắt đầu tìm kiếm"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        {conversations.map((conv) => (
                            <Box key={conv.id} sx={{ mb: 2 }}>
                                <Paper sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: conv.active ? 'lightgray' : 'white' }}>
                                    <Avatar alt={conv.name} src={conv.imageUrl} sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="body1">{conv.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{conv.lastMessage}</Typography>
                                        <Typography variant="body2" color="textSecondary">{conv.time}</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Chat Window */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <Box sx={{ p: 2, borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt="Chú Phúc" src="/path/to/avatar.jpg" sx={{ mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Chú Phúc</Typography>
                                    <Typography variant="body2" color="textSecondary">Hoạt động 3 giờ trước</Typography>
                                </Box>
                            </Box>
                            <IconButton onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Xem hồ sơ</MenuItem>
                                <MenuItem onClick={handleClose}>Chặn người dùng</MenuItem>
                                <MenuItem onClick={handleClose}>Báo xấu</MenuItem>
                                <MenuItem onClick={handleClose}>Đánh dấu tin nhắn rác</MenuItem>
                                <MenuItem onClick={handleClose}>Ẩn hội thoại</MenuItem>
                            </Menu>
                        </Box>

                        {/* Chat Messages */}
                        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar alt="Giày Hàng hiệu MLB" src="/path/to/shoes.jpg" sx={{ mr: 2 }} />
                                <Box>
                                    <Typography variant="body1">Áo FPT</Typography>
                                    <Typography variant="body2" color="textSecondary">{conversations[0].price}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography>Sản phẩm này còn không ạ?</Typography>
                                <Typography>Bạn có ship hàng không?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>

                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>

                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>
                                <Typography>Bạn có những size nào?</Typography>

                            </Box>
                        </Box>

                        {/* Message Input */}
                        <Box sx={{ p: 2, borderTop: '1px solid lightgray', display: 'flex', alignItems: 'center' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="icon-button-file"
                                type="file"
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <TextField
                                fullWidth
                                placeholder="Nhập tin nhắn"
                                variant="outlined"
                                sx={{ mx: 2 }}
                            />
                            <IconButton color="primary">
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserChat;
