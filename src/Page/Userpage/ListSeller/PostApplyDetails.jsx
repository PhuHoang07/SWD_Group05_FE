import React, { useState, useEffect } from "react";
import axios from "../../../Services/axios/config";
import { Grid, Card, CardContent, Typography, Checkbox, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { chooseBuyer } from "../../../Services/productPostApi";

const PostApplyDetails = () => {
  const navigate = useNavigate();
  const { id: transactionId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);

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

  const handleBuyerSelection = (buyerId) => {
    setSelectedBuyerId(buyerId);
  };

  const handleChooseBuyer = async () => {
    if (selectedBuyerId) {
      try {
        await chooseBuyer(transactionId, selectedBuyerId);
        alert('Buyer chosen successfully!');
        navigate('/seller-history');
      } catch (error) {
        console.error('Error choosing buyer:', error);
        alert('Failed to choose buyer.');
      }
    } else {
      alert('Please select a buyer.');
    }
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
                <Checkbox
                  checked={selectedBuyerId === txn.id}
                  onChange={() => handleBuyerSelection(txn.id)}
                  inputProps={{ 'aria-label': 'Select Buyer' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleChooseBuyer}>
        Choose Buyer
      </Button>
    </div>
  );
};

export default PostApplyDetails;
