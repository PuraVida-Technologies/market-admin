import "antd/dist/antd.css";
import React from "react";
import styles from "./styles.module.scss";
import CustomDatePicker from "../DatePicker";
import Bubble from "../Bubble";
import { Button, Dropdown, Menu } from "antd";
import { DASHBOARD } from "@/common/constants";

type FilterBarProps = {
  handleView: (view: string) => void;
};

export default function FilterBar({ handleView }: FilterBarProps): JSX.Element {
  const viewsMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Post</span>,
          onClick: () => handleView(DASHBOARD.views.post),
        },
        {
          key: "2",
          label: <span>Tags</span>,
          onClick: () => handleView(DASHBOARD.views.tag),
        },
        {
          key: "3",
          label: <span>Map</span>,
          onClick: () => handleView(DASHBOARD.views.map),
        },
        {
          key: "4",
          label: <span>Request Post Update</span>,
          onClick: () => handleView(DASHBOARD.views.updatePostRequest),
        },
      ]}
    />
  );

  return (
    <div className={styles.filterBAr}>
      <CustomDatePicker />
      <div className={styles.bubblesContainer}>
        <Dropdown overlay={viewsMenu} placement="bottomLeft" arrow trigger={["click"]}>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text="listing" src="/icons/listing.svg" iconWidth={16} iconHeight={14} />
          </Button>
        </Dropdown>
        <Dropdown overlay={viewsMenu} placement="bottomLeft" arrow trigger={["click"]}>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text="sorting" src="/icons/sorting.svg" iconWidth={24} iconHeight={15} />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}
