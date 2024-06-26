import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, Grid, Paper, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ReportIcon from '@mui/icons-material/Report';
import AlertIcon from '@mui/icons-material/Error';

const similarListings = [
    {
        id: 1,
        imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
        title: 'Tài Liệu SV',
        description: 'Description of Car 1',
        price: '$10,000',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        Campus: 'Hồ Chí Minh',
        Seller: 'Nguyễn Văn A',
    },
    {
        id: 2,
        imageUrl: 'https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg',
        title: 'Tài liệu prj',
        description: 'Description of Car 2',
        price: '$20,000',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        Campus: 'Cần Thơ',
        Seller: 'Trần Văn B',
    },
    {
        id: 3,
        imageUrl: 'https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png',
        title: 'Tài Liệu SV',
        description: 'Description of Car 1',
        price: '$10,000',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        Campus: 'Hồ Chí Minh',
        Seller: 'Nguyễn Văn A',
    },
];

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { card } = location.state || {};

    const [phoneVisible, setPhoneVisible] = useState(false);

    const handleShowPhone = () => {
        setPhoneVisible(true);
    };

    const handleReportSold = () => {
        // Handle report sold logic here
        alert('Báo cáo: Sản phẩm đã được bán.');
    };

    const handleReportInvalid = () => {
        // Handle report invalid logic here
        alert('Báo cáo: Thông tin không hợp lệ.');
    };

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={card.imageUrl}
                            alt={card.title}
                        />
                        <CardContent>
                            <Typography variant="h4" component="h2" gutterBottom>
                                {card.title}
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                                Price: {card.price}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {card.description}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                {card.features.map((feature, idx) => (
                                    <Typography key={idx} variant="body2" sx={{ display: 'block' }}>
                                        - {feature}
                                    </Typography>
                                ))}
                            </Box>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Campus: {card.Campus}
                            </Typography>
                        </CardContent>
                        <Box sx={{ mt: 2, ml: 2, mb: 4}}>
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<ReportIcon />}
                                onClick={handleReportSold}
                            >
                                Báo cáo: Đã bán
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<AlertIcon />}
                                sx={{ ml: 1 }}
                                onClick={handleReportInvalid}
                            >
                                Báo cáo: Tin không hợp lệ
                            </Button>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Avatar alt="Seller Name" src="/path/to/avatar.jpg" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {card.Seller}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
                                    <Typography variant="body2">5 (2 đánh giá)</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Hoạt động 14 phút trước
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<PhoneIcon />}
                            sx={{ mt: 2, width: '100%' }}
                            onClick={handleShowPhone}
                        >
                            {phoneVisible ? card.Phone : 'Bấm để hiện số'}
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            startIcon={<ChatIcon />}
                            sx={{ mt: 1, width: '100%' }}
                            component={Link}
                            to={{
                                pathname: "/user-chat",
                                state: { product: card }
                            }}
                        >
                            Chat với người bán
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" gutterBottom>Tin đăng tương tự</Typography>
                        <Button variant="text">Xem tất cả</Button>
                    </Box>
                </Grid>
                {similarListings.map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={listing.imageUrl}
                                alt={listing.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {listing.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {listing.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Campus: {listing.Campus}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductDetails;
