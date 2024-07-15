import React, { useState, useEffect } from "react";
import "./PostApply.css";

const PostApplyDetailsHistory = () => {
  const [postApplies] = useState([
    {
      id: 1,
      message: "I'm interested in this product.",
      buyerInfo: {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "123-456-7890",
      },
    },
    {
      id: 2,
      message: "Can you provide more details?",
      buyerInfo: {
        name: "Jane Smith",
        email: "jane@example.com",
        phoneNumber: "987-654-3210",
      },
    },
  ]);

  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserInformation(user);
  }, []);

  return (
    <div className="post-apply-details">
      <h2>Post Applies Details</h2>
      <div className="post-apply-list">
        {postApplies.map((apply) => (
          <div key={apply.id} className="apply-item">
            {apply.buyerInfo?.email !== userInformation?.email && (
              <>
                {apply.message && (
                  <p>
                    <strong>Message:</strong> {apply.message}
                  </p>
                )}
                {apply.buyerInfo && (
                  <>
                    <p>
                      <strong>Buyer Name:</strong> {apply.buyerInfo.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {apply.buyerInfo.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {apply.buyerInfo.phoneNumber}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostApplyDetailsHistory;
