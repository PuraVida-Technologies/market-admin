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
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <Image src="/icons/admin.svg" alt="admin" width={54} height={54} />
            </div>
            <div className={styles.text}>
              <p>Admin</p>
              <p>Good Morning!</p>
            </div>
          </div>
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
