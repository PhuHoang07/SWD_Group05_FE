import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Tabs, Tab, Paper } from '@mui/material';
import { changePassword } from '../../Services/accountApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handlePasswordChange = async () => {
        try {
            if (newPassword !== confirmPassword) {
                toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
                return;
            }

            const response = await changePassword(oldPassword, newPassword, confirmPassword);
            toast.success(response.message);
            // Clear password fields after successful change
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Paper sx={{ width: '60%', p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Thông tin cá nhân" />
                    <Tab label="Cài đặt tài khoản" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            Thông tin cá nhân
                        </Typography>
                        <TextField
                            required
                            label="Họ và tên"
                            defaultValue="Đức Nguyễn"
                        />
                        <TextField
                            required
                            label="Email"
                            defaultValue="ducnxse171688@fpt.edu.vn"
                        />
                        <TextField
                            required
                            label="Số điện thoại"
                            defaultValue="0903764392"
                        />
                        <Button variant="contained" color="primary">
                            Lưu
                        </Button>
                    </Box>
                )}

                {tabIndex === 1 && (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            Thay đổi mật khẩu
                        </Typography>
                        <TextField
                            required
                            label="Mật khẩu hiện tại"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            required
                            label="Mật khẩu mới"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            required
                            label="Xác nhận mật khẩu mới"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePasswordChange}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default EditProfile;
