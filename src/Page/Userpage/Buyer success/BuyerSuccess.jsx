import React, { useState } from "react";
import { Card } from "antd";
import "./BuySuccess.css";

const BuyerSuccess = () => {
  const [buyerHistory] = useState([
    {
      id: 1,
      title: "Sample Post 1",
      description: "This is a description for sample post 1.",
      price: "$100",
      category: "Electronics",
      postMode: "Sell",
      campus: "Main Campus",
      createdDate: "2023-07-14T00:00:00Z",
      expiredDate: "2024-07-14T00:00:00Z",
      imageUrls: [
        "https://via.placeholder.com/150"
      ]
    },
    {
      id: 2,
      title: "Sample Post 2",
      description: "This is a description for sample post 2.",
      price: "$200",
      category: "Books",
      postMode: "Sell",
      campus: "North Campus",
      createdDate: "2023-07-15T00:00:00Z",
      expiredDate: "2024-07-15T00:00:00Z",
      imageUrls: [
        "https://via.placeholder.com/150"
      ]
    },
    {
      id: 3,
      title: "Sample Post 3",
      description: "This is a description for sample post 3.",
      price: "$300",
      category: "Furniture",
      postMode: "Sell",
      campus: "South Campus",
      createdDate: "2023-07-16T00:00:00Z",
      expiredDate: "2024-07-16T00:00:00Z",
      imageUrls: [
        "https://via.placeholder.com/150"
      ]
    }
  ]);

  return (
    <div className="buyer-history">
      <Card title="Buyer History" className="buyer-history-card">
        <div className="post-list">
          {buyerHistory.map((post) => (
            <div key={post.id} className="post-item">
              <div className="item-header">
                <h2>{post.title}</h2>
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <img
                    src={post.imageUrls[0]}
                    alt={post.title}
                    className="item-image"
                  />
                )}
              </div>
              <div className="post-details">
                <p>Description: {post.description}</p>
                <p>Price: {post.price}</p>
                <p>Category: {post.category}</p>
                <p>Post Mode: {post.postMode}</p>
                <p>Campus: {post.campus}</p>
                <p>
                  Created Date:{" "}
                  {new Date(post.createdDate).toLocaleDateString()}
                </p>
                <p>
                  Expired Date:{" "}
                  {new Date(post.expiredDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BuyerSuccess;
