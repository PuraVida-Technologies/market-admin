import "antd/dist/antd.css";
import React, { FC } from "react";
import { Card, Button, Tag } from "antd";
import { Post } from "@/services/post";

interface CustomCardProps {
  post: Post;
  viewDetail: (slug?: string) => void;
}

const CustomCard: FC<CustomCardProps> = ({ post, viewDetail }) => {
  return (
    <Card
      hoverable
      className="custom-card"
      style={{ width: "100%", padding: "0rem", borderRadius: "1rem", overflow: "hidden" }}
      cover={
        <img
          alt="post"
          src={post.mainImageUrl ? post.mainImageUrl : "/img/empty.png"}
          width="100%"
          style={{
            width: "100%",
            height: "10rem",
            objectFit: "cover",
            padding: "0rem",
            background: "gray",
          }}
        />
      }
    >
      <div className="">
        <div className="line-height-1">
          <span className="custom-top-1">{post.name}</span>
          <span className="description-1 custom-top-1 custom-eighty-percent">{post.address}</span>
        </div>
        <Button
          type="primary"
          shape="round"
          size={"middle"}
          onClick={() => viewDetail(post._id)}
          style={{ background: "#3653FE", color: "#ffffff", border: "none", outline: "none", marginTop: "1rem" }}
        >
          View Details
        </Button>
        <Tag
          style={{
            background: "#55A588",
            color: "#fff",
            border: "none",
            marginLeft: ".5rem",
            outline: "none",
            marginTop: "1rem",
            height: "32px",
            padding: "4px 16px",
            fontSize: "14px",
            borderRadius: "32px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {post.status}
        </Tag>
      </div>
    </Card>
  );
};

export default CustomCard;
