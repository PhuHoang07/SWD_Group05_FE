import React, { useState, useEffect } from "react";
import axios from "../../../Services/axios/config";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const PostApplyDetails = () => {
  const { id: transactionId } = useParams();
  console.log("Transaction ID:", transactionId);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/product-transaction/${transactionId}/buyers`)
      .then((response) => {
        console.log("API response:", response);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [transactionId]);

  const handleSellClick = (txnId) => {
    console.log(`Sell button clicked for transaction ID: ${txnId}`);
  };

  return (
    <div>
      <h1>Details</h1>
      <Grid container spacing={2}>
        {transactions.map((txn) => (
          <Grid item xs={12} sm={6} md={4} key={txn.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Transaction ID: {txn.id}
                </Typography>
                <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
                  Buyer Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Name: {txn.buyerInfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {txn.buyerInfo.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone Number: {txn.buyerInfo.phoneNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transacted At: {new Date(txn.transactAt).toLocaleString()}
                </Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleSellClick(transactionId)}
                  style={{ marginTop: '10px' }}
                >
                  Sell
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PostApplyDetails;
