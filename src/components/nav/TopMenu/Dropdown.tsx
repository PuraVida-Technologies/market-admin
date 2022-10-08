import React, { FC } from "react";
import { Menu } from "antd";
import styles from "./styles.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";

interface DropdownProps {
  mode: "horizontal" | "vertical" | "inline";
}

const Dropdown: FC<DropdownProps> = ({ mode }) => {
  return (
    <Menu mode={mode} style={{ borderBottom: "none" }}>
      <Menu.SubMenu
        style={{ borderBottom: "none" }}
        title={
          <>
            <div className={styles.notificationContainer}>
              <Image src="/icons/notification-icon.svg" alt="notification" width={24} height={24} />
              <div className={styles.notificationDot}></div>
            </div>
          </>
        }
      >
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Dropdown;
