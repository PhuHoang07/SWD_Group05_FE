import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Tabs, Tab, Paper } from '@mui/material';
import { changePassword, updateAccountUser } from '../../Services/accountApi';
import { toast } from 'react-toastify';
import axiosClient from '../../Services/axios/config';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({ id: '', fullname: '', email: '', phoneNumber: '' });

    useEffect(() => {
        const fetchUserData = async (userId) => {
            try {
                const response = await axiosClient.get(`/api/user/view/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Lỗi khi tải thông tin người dùng.');
            }
        };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            fetchUserData(storedUser.id);
        }
    }, []);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleUpdateUser = async () => {
        try {
            const response = await updateAccountUser(user.id, user.fullname, user.phoneNumber);
            toast.success('Cập nhật hồ sơ thành công.');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Lỗi khi cập nhật hồ sơ. Vui lòng thử lại sau.');
        }
    };

    const handlePasswordChange = async () => {
        try {
            if (newPassword !== confirmPassword) {
                toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
                return;
            }

            const response = await changePassword(oldPassword, newPassword, confirmPassword);
            toast.success('Thay đổi mật khẩu thành công.');
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
                            value={user.fullname}
                            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                        />
                        <TextField
                            required
                            label="Email"
                            value={user.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            required
                            label="Số điện thoại"
                            value={user.phoneNumber}
                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateUser}
                        >
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
