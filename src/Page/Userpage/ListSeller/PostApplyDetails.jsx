import React, { useState, useEffect } from "react";
import axios from "../../../Services/axios/config";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const PostApplyDetails = () => {
  const { id: transactionId } = useParams();
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

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        List of Buyers
      </Typography>

      {transactions.length === 0 ? (
        <Typography variant="body1" align="center">
          No buyers for this post.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {transactions.map((txn) => (
            <Grid item xs={12} sm={6} md={4} key={txn.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Transaction ID: {txn.id}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    <strong>Buyer Information</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Name:</strong> {txn.buyerInfo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {txn.buyerInfo.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Phone Number:</strong> {txn.buyerInfo.phoneNumber}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    <strong>Additional Details:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong> {txn.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {txn.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Campus:</strong> {txn.campus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> {txn.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong>{" "}
                    {new Date(txn.expiredDate).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PostApplyDetails;
