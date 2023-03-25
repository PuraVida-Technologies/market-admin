import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Bubble from "../Bubble";
import { Button, Dropdown, Menu } from "antd";
import { DASHBOARD } from "@/common/constants";
import { useRouter } from "next/router";

type FilterBarProps = {
  handleStatus: (status: string) => void;
};

export default function StatusBar({ handleStatus }: FilterBarProps): JSX.Element {
  const [statusTitle, setStatusTitle] = useState("Status");

  const router = useRouter();
  useEffect(() => {
    if (router.query.status && typeof router.query.status === "string") {
      const status = router.query.status as string;
      setStatusTitle(status);
    }
  }, [router.query]);

  const statusMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Approved</span>,
          onClick: () => handleStatus(DASHBOARD.status.approved),
        },
        {
          key: "2",
          label: <span>Pending</span>,
          onClick: () => handleStatus(DASHBOARD.status.pending),
        },
        {
          key: "3",
          label: <span>Rejected</span>,
          onClick: () => handleStatus(DASHBOARD.status.rejected),
        },
      ]}
    />
  );

  return (
    <div className={styles.filterBAr}>
      <div className={styles.bubblesContainer}>
        <Dropdown overlay={statusMenu} placement="bottomLeft" arrow trigger={["click"]}>
          <Button style={{ border: "none", padding: "0", outline: "none" }}>
            <Bubble text={statusTitle} iconWidth={24} iconHeight={15} />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}
