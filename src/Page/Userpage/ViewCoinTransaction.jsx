import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { getAllTransactionByMe } from '../../Services/coinTransactionApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoinTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchTransactions(pageIndex);
    }, [pageIndex]);

    const fetchTransactions = async (pageIndex) => {
        try {
            const response = await getAllTransactionByMe(pageIndex - 1); // API is 0-indexed
            setTransactions(response.data || []);
            setTotalItems(response.totalItems || 0);
            setPageSize(response.pageSize || 10);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error('Đã xảy ra lỗi khi lấy dữ liệu giao dịch. Vui lòng thử lại sau.');
        }
    };

    const handleChangePage = (event, value) => {
        setPageIndex(value);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, bgcolor: '#f0f0f0', color: '#333', borderRadius: 1, p: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                Coin Transactions
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: '#ffffff', color: '#333' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Transaction Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Coin Amount</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No transactions found</TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction, index) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{index + 1 + (pageIndex - 1) * pageSize}</TableCell>
                                    <TableCell>{new Date(transaction.transactAt).toLocaleString()}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>{transaction.coinAmount}</TableCell>
                                    <TableCell>{transaction.price}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(totalItems / pageSize)}
                    page={pageIndex}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default CoinTransactions;
