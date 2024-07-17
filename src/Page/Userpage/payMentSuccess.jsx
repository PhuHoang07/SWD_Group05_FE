import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { format, parse } from 'date-fns';
import axiosClient from '../../Services/axios/config';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Divider
} from '@mui/material';

const PayMentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const vnp_Amount = queryParams.get('vnp_Amount');
  const vnp_BankCode = queryParams.get('vnp_BankCode');
  const vnp_BankTranNo = queryParams.get('vnp_BankTranNo');
  const vnp_CardType = queryParams.get('vnp_CardType');
  const vnp_OrderInfo = queryParams.get('vnp_OrderInfo');
  const vnp_PayDate = queryParams.get('vnp_PayDate');
  const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');
  const vnp_TmnCode = queryParams.get('vnp_TmnCode');
  const vnp_TransactionNo = queryParams.get('vnp_TransactionNo');
  const vnp_TransactionStatus = queryParams.get('vnp_TransactionStatus');
  const vnp_TxnRef = queryParams.get('vnp_TxnRef');
  const vnp_SecureHash = queryParams.get('vnp_SecureHash');

  // Format the amount to be more readable
  const formattedAmount = vnp_Amount ? (parseInt(vnp_Amount, 10) / 100).toFixed(2) + ' VND' : 'N/A';

  // Format the pay date to be more readable (only date without time)
  let formattedPayDate = 'N/A';
  if (vnp_PayDate) {
    // Check if the date is in a valid format
    const parsedDate = parse(vnp_PayDate, 'yyyyMMddHHmmss', new Date());
    if (!isNaN(parsedDate.getTime())) {
      formattedPayDate = format(parsedDate, 'dd/MM/yyyy');
    }
  }

  // Determine the transaction status message
  const transactionStatusMessage = vnp_TransactionStatus === '00' ? 'Thanh toán thành công' : 'Thanh toán không thành công';

  // Function to fetch API data
  const fetchAPIData = async (status, transactId) => {
    try {
      const response = await axiosClient.put('/api/coin-transaction', {
        status,
        transactId
      });
      console.log('API call response:', response.data);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: '20px auto' }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom>Kết quả thanh toán</Typography>
        <Typography variant="h6" color={vnp_TransactionStatus === '00' ? 'green' : 'red'}>
          {transactionStatusMessage}
        </Typography>
      </Box>
      <Divider />
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Ngân hàng:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_BankCode || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Mã giao dịch ngân hàng:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_BankTranNo || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Loại thẻ:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_CardType || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Thông tin đơn hàng:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_OrderInfo || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Số tiền:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{formattedAmount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Ngày thanh toán:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{formattedPayDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Mã phản hồi giao dịch:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_ResponseCode || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Mã cửa hàng:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_TmnCode || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1"><strong>Mã giao dịch:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{vnp_TransactionNo || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center" mt={3}>
        <Link to={{
          pathname: '/',
          state: {
            status: vnp_TransactionStatus === '00' ? 'Success' : 'Fail',
            transactId: vnp_TxnRef
          }
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchAPIData(vnp_TransactionStatus === '00' ? 'Success' : 'Fail', vnp_TxnRef)}
          >
            Về trang chủ
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default PayMentSuccess;
