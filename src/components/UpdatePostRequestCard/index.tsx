import "antd/dist/antd.css";
import React, { FC } from "react";
import { Card, Button, Tag } from "antd";
import { PostData } from "@/services/updatePostsRequests";
import styles from "./styles.module.scss";

interface CustomCardProps {
  post: PostData;
  viewDetail: (slug?: string) => void;
}

const UpdatePostRequestCard: FC<CustomCardProps> = ({ post, viewDetail }) => {
  const statusClass = {
    approved: styles.approvedStatus,
    rejected: styles.rejectedStatus,
    pending: styles.pendingStatus,
  };

  //@ts-ignore
  const statusClassName: string = statusClass[post.status.toLowerCase() || "approved"];

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
          className={styles.cover}
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
        <Tag className={statusClassName}>{post.status}</Tag>
      </div>
    </Card>
  );
};

export default UpdatePostRequestCard;
