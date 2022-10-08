import "antd/dist/antd.css";
import React, { FC } from "react";
import { Card, Button } from "antd";

interface CustomCardProps {
  coverImage: string;
  approved: boolean;
  viewDetail: () => void;
}

const CustomCard: FC<CustomCardProps> = ({ coverImage, approved, viewDetail }) => {
  return (
    <Card
      hoverable
      className="custom-card"
      style={{ width: "100%", padding: "0rem", borderRadius: "1rem", overflow: "hidden" }}
      cover={
        <img
          alt="example"
          src={coverImage ? coverImage : "/img/empty.png"}
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
          <span className="market-bold-1">$20</span>
          <span className="custom-top-1">Burger Mall</span>
          <span className="description-1 custom-top-1 custom-eighty-percent">
            Nunciatura, Rohrmoser, San José, Costa Rica
          </span>
        </div>
        <Button
          type="primary"
          shape="round"
          size={"middle"}
          onClick={viewDetail}
          style={{ background: "#3653FE", color: "#ffffff", border: "none", outline: "none", marginTop: "1rem" }}
        >
          View Details
        </Button>
        {approved && (
          <Button
            type="primary"
            shape="round"
            size={"middle"}
            style={{
              background: "#55A588",
              color: "#ffffff",
              border: "none",
              marginLeft: ".5rem",
              outline: "none",
              marginTop: "1rem",
            }}
          >
            Approved
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CustomCard;
