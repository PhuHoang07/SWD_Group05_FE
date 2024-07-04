import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Tabs, Tab, Paper } from '@mui/material';

const EditProfile = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
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
                        <TextField
                            label="Campus"
                            defaultValue="FPT HCM"
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
                        />
                        <TextField
                            required
                            label="Mật khẩu mới"
                            type="password"
                        />
                        <TextField
                            required
                            label="Xác nhận mật khẩu mới"
                            type="password"
                        />
                        <Button variant="contained" color="primary">
                            Đổi mật khẩu
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default EditProfile;
