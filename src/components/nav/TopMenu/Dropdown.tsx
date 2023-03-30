import React, { FC } from "react";
import { Menu } from "antd";
import styles from "./styles.module.scss";
import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { greeting } from "@/util/greeting";

interface DropdownProps {
  mode: "horizontal" | "vertical" | "inline";
}

const Dropdown: FC<DropdownProps> = ({ mode }) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };
  return (
    <Menu mode={mode} style={{ borderBottom: "none" }}>
      <Menu.SubMenu
        style={{ borderBottom: "none" }}
        title={
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <Image src="/icons/social_profile.svg" alt="admin" width={54} height={54} />
            </div>
            <div className={styles.text}>
              <p>Admin</p>
              <p>{greeting()}</p>
            </div>
          </div>
        }
      >
        <Menu.Item key="" onClick={() => router.push("/profile")}>
          <ProfileOutlined /> Profile
        </Menu.Item>
        <Menu.Item key="log-out" onClick={logout}>
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Dropdown;
