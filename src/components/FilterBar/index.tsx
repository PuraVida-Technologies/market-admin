import "antd/dist/antd.css";
import React from "react";
import styles from "./styles.module.scss";
import CustomDatePicker from "../DatePicker";
import Bubble from "../Bubble";

import { Button, Dropdown, Menu } from "antd";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Map
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Post
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            Tag
          </a>
        ),
      },
    ]}
  />
);

export default function FilterBar(): JSX.Element {
  return (
    <div className={styles.filterBAr}>
      <CustomDatePicker />
      <div className={styles.bubblesContainer}>
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text="listing" src="/icons/listing.svg" iconWidth={16} iconHeight={14} />
          </Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text="sorting" src="/icons/sorting.svg" iconWidth={24} iconHeight={15} />
          </Button>
        </Dropdown>
        {/* <Bubble text="sorting" src="/icons/sorting.svg" iconWidth={24} iconHeight={15} /> */}
      </div>
    </div>
  );
}
