import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, Grid, Paper, Avatar, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ReportIcon from '@mui/icons-material/Report';
import AlertIcon from '@mui/icons-material/Error';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axiosClient from '../../Services/axios/config';

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { card } = location.state || {};

    const [phoneVisible, setPhoneVisible] = useState(false);
    const [similarListings, setSimilarListings] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

    useEffect(() => {
        const fetchSimilarListings = async () => {
            try {
                const response = await axiosClient.get(`/api/product-post/${id}`);
                if (response.data && response.data.similarListings) {
                    setSimilarListings(response.data.similarListings);
                } else {
                    setSimilarListings([]);
                }
            } catch (error) {
                console.error('Error fetching similar listings:', error);
            }
        };

        fetchSimilarListings();
    }, [id]);

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

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + card.imageUrls.length) % card.imageUrls.length);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % card.imageUrls.length);
    };

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={card.imageUrls[currentImageIndex]}
                            alt={card.title}
                            sx={{ objectFit: 'contain' }}
                        />
                        <CardContent>
                            <Grid container spacing={2} sx={{ marginTop: 4 }}>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5" gutterBottom>Ảnh khác của sản phẩm</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <IconButton onClick={handlePreviousImage}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                        {card.imageUrls.map((imageUrl, index) => (
                                            <Box key={index} sx={{ mx: 1 }}>
                                                <img
                                                    src={imageUrl}
                                                    alt={`Product Image ${index}`}
                                                    style={{ width: 80, height: 80, cursor: 'pointer', objectFit: 'cover' }}
                                                    onClick={() => handleImageClick(index)}
                                                />
                                            </Box>
                                        ))}
                                        <IconButton onClick={handleNextImage}>
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
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
                                {card.features && card.features.map((feature, idx) => (
                                    <Typography key={idx} variant="body2" sx={{ display: 'block' }}>
                                        - {feature}
                                    </Typography>
                                ))}
                            </Box>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Campus: {card.campus}
                            </Typography>
                        </CardContent>
                        <Box sx={{ mt: 2, ml: 2, mb: 4 }}>
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
                                    {card.createdBy.fullName}
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
                            {phoneVisible ? card.createdBy.phoneNumber : 'Bấm để hiện số'}
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
                                sx={{ objectFit: 'contain' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {listing.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {listing.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Campus: {listing.campus}
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
