import styles from "./styles.module.scss";
import { Button, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import { FC } from "react";

const { Header } = Layout;

interface TopMenuProps {
  onclick: () => void;
}

const TopMenu: FC<TopMenuProps> = ({ onclick }) => {
  return (
    <Header className={styles.header}>
      <div className={styles.logoConatainer}>
        <Link href="/dashboard">
          <div className={styles.logoImg}>
            <Image src="/icons/pvb-logo.svg" alt="PVB Logo" width={"100%"} height={"100%"} />
          </div>
        </Link>
        <p className={styles.logoText}>Bitcoin wallet market admin dashboard</p>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.notificationContainer}>
          <Image src="/icons/notification-icon.svg" alt="notification" width={24} height={24} />
          <div className={styles.notificationDot}></div>
        </div>
        <div className="rightMenu">
          <Dropdown mode={"horizontal"} />
        </div>
      </div>
      <Button className={styles.menulogo} type="text" onClick={onclick}>
        <MenuOutlined />
      </Button>
    </Header>
  );
};

export default TopMenu;
