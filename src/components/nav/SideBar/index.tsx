import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "../TopMenu/styles.module.scss";
import React, { FC } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { greeting } from "@/functions";

interface SideBarProps {
  open: boolean;
  onClick: () => void;
}

const SideBar: FC<SideBarProps> = ({ open, onClick }) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };
  return (
    <>
      <Drawer placement={"left"} closable={false} onClose={onClick} open={open} key={"left"}>
        <div className="" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/dashboard">
            <div className={styles.logoImg}>
              <Image src="/icons/logo.png" alt="PuraVida" width={"100%"} height={"100%"} />
            </div>
          </Link>
          <div onClick={onClick}>
            <CloseCircleOutlined style={{ fontSize: "32px", marginRight: "1rem" }} />
          </div>
        </div>
        <div style={{ position: "relative", height: "80vh" }}>
          <div onClick={() => router.push("/profile")} className={styles.mobileSection}>
            <div className={styles.avatarContainer}>
              <Image src="/icons/social_profile.svg" alt="admin" width={54} height={54} />
            </div>
            <div className={styles.text}>
              <p>Admin</p>
              {greeting()}
            </div>
          </div>
          <button onClick={logout} className={styles.mobLogout}>
            Logout
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default SideBar;
