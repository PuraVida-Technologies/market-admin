import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
// import CustomDatePicker from "../DatePicker";
import Bubble from "../Bubble";
import { Button, Dropdown, Menu } from "antd";
import { DASHBOARD } from "@/common/constants";
import { useRouter } from "next/router";

type FilterBarProps = {
  handleView: (view: string) => void;
  handleSort: (sorting: string) => void;
};

export default function FilterBar({ handleView, handleSort }: FilterBarProps): JSX.Element {
  const [title, setTitle] = useState("listing");

  const router = useRouter();
  useEffect(() => {
    if (router.query.view && typeof router.query.view === "string") {
      const title = (router.query.view as string).split("-view")[0].split("-").join(" ");
      setTitle(title);
    }
  }, [router.query]);
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
        // {
        //   key: "3",
        //   label: <span>Map</span>,
        //   onClick: () => handleView(DASHBOARD.views.map),
        // },
        {
          key: "4",
          label: <span>Request Post Update</span>,
          onClick: () => handleView(DASHBOARD.views.updatePostRequest),
        },
      ]}
    />
  );

  const sortingMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Oldest</span>,
          onClick: () => handleSort(DASHBOARD.sortings.ascending),
        },
        {
          key: "2",
          label: <span>Newest</span>,
          onClick: () => handleSort(DASHBOARD.sortings.descending),
        },
      ]}
    />
  );

  return (
    <div className={styles.filterBAr}>
      <div>{/* <CustomDatePicker /> */}</div>
      <div className={styles.bubblesContainer}>
        <Dropdown overlay={viewsMenu} placement="bottomLeft" arrow trigger={["click"]}>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text={title} src="/icons/listing.svg" iconWidth={16} iconHeight={14} />
          </Button>
        </Dropdown>
        <Dropdown overlay={sortingMenu} placement="bottomLeft" arrow trigger={["click"]}>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text="Sorting" src="/icons/sorting.svg" iconWidth={24} iconHeight={15} />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}
