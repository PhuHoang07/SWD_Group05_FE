import React from "react";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./post-card-item.css";
const { Meta } = Card;

const PostCardItem = ({ data }) => {
  const navigate = useNavigate();

  const { postName, image, detail, expire } = data;

  const handleShowDemo = () => {};

  const handleUpdateTimeshare = async (status) => {};
  return (
    <Card
      className="post-card-item"
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src={
            image ||
            "https://vietnamstaytravel.com/wp-content/uploads/2021/08/202108101050-image1.jpg"
          }
        />
      }
      actions={[
        <CloseCircleOutlined
          key="decline"
          style={{ color: "red" }}
          onClick={() => handleUpdateTimeshare(3)}
        />,
        <InfoCircleOutlined
          key="info"
          style={{ color: "blue" }}
          onClick={handleShowDemo}
        />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src={"https://api.dicebear.com/7.x/miniavs/svg?seed=8"} />
        }
        title={postName}
        description={detail + `. Expire: ${expire}`}
      />
    </Card>
  );
};
export default PostCardItem;
