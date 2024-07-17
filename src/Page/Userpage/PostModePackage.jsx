import { Box, Container, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllCoinPackActive } from '../../Services/coinPackageApi';
import { payPack } from '../../Services/coinPackageApi'


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const sliderImages = [
  'https://photo2.tinhte.vn/data/attachment-files/2021/11/5712894_3f3f46be378a3aa2a9912908f1559065.jpg',
  'https://cdn-www.vinid.net/2019/10/2019-10-22_VNPay_BannerWeb_1920x1080.jpg',
  'https://design.vnpay.vn/web/vi-vnpay/chinh/langding-page-ver2/media/img/banner/banner-home-ctkm.png',
];

function PostModePackage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);


  useEffect(() => {
    const fetchCoinPacks = async () => {
      try {
        const data = await getAllCoinPackActive();
        console.log('', data);
        setOptions(data.map(option => ({
          id: option.id,
          value: option.price,
          label: `${parseInt(option.price).toLocaleString()} VND`,
          Xu: option.coinAmount,
        })));
        
      } catch (error) {
        console.error('Failed to fetch coin packs:', error);
      }
    };
    fetchCoinPacks(); 
  }, []);

  const handlePayment = async () => {
    if (selectedOption) {
      const coinPackId = selectedOption.id;
      const redirectUrl = 'http://localhost:5173/payment-success'; // Thay đổi redirectURL tùy theo cấu hình của bạn
      try {
        const data = await payPack(coinPackId, redirectUrl);
        console.log('Payment successful:', data.data);
        window.location.href = data.data.transactUrl;
        // Xử lý logic sau khi thanh toán thành công, có thể là chuyển hướng hoặc cập nhật giao diện người dùng
      } catch (error) {
        console.error('Payment failed:', error);
        // Xử lý logic khi thanh toán thất bại, có thể thông báo lỗi cho người dùng
      }
    } else {
      console.log('No package selected');
    }
  };
  
  const handleAmountChange = (event) => {
    const selected = options.find(option => option.value === event.target.value);
    setSelectedOption(selected);
  };

  return (
    <Container sx={{ flexGrow: 1, padding: 3 }}>
      <Slider {...sliderSettings}>
        {sliderImages.map((url, index) => (
          <div key={index} className="slider-image-container">
            <img src={url} alt={`Slide ${index + 1}`} className="slider-image" style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="flex-start" sx={{ marginTop: '20px' }}>
        <Box width="100%" sx={{ padding: 3 }}>
          <Typography variant="h6" align="center" sx={{ marginBottom: '20px' }}>
            Chọn Gói Nạp
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Giá</TableCell>
                  <TableCell>Xu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options.map((option) => (
                  <TableRow key={option.value}>
                    <TableCell>
                      <Radio
                        checked={selectedOption?.value === option.value}
                        onChange={handleAmountChange}
                        value={option.value}
                        name="radio-buttons"
                        size="small"
                      />
                      {option.label}
                    </TableCell>
                    <TableCell>Xu × {option.Xu}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box width="100%" sx={{ padding: 3 }}>
          <Typography variant="h6" align="center" sx={{ marginBottom: '20px', fontSize: '1.5rem' }}>
            Chi tiết giao dịch:
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'left', color: 'text.secondary' }}>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              Sản phẩm được chọn: {selectedOption && `Xu × ${selectedOption.Xu}`}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              Giá: {selectedOption && `${parseInt(selectedOption.value, 10).toLocaleString()} VND`}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>Phương thức thanh toán: Ví VNPAY</Typography>
          
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            sx={{ marginTop: 2 }}
          >
            Xử lý thanh toán
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default PostModePackage;
