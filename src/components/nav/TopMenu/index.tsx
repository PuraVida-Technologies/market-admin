import styles from "./styles.module.scss";
import { Button, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";

const { Header } = Layout;

export default function TopMenu(): JSX.Element {
  return (
    <Header className={styles.header}>
      <div className={styles.logoConatainer}>
        <Link href="/home">
          <div className={styles.logoImg}>
            <Image src="/icons/pvb-logo.svg" alt="PVB Logo" width={"100%"} height={"100%"} />
          </div>
        </Link>
        <p className={styles.logoText}>Bitcoin wallet market admin dashboard</p>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Image src="/icons/admin.svg" alt="admin" width={54} height={54} />
        </div>
        <div className={styles.text}>
          <p>Admin</p>
          <p>Good Morning!</p>
        </div>
        {/* <div className={styles.notificationContainer}>
          <Image src="/icons/notification-icon.svg" alt="notification" width={24} height={24} />
          <div className={styles.notificationDot}></div>
        </div> */}
        <div className="rightMenu">
          <Dropdown mode={"horizontal"} />
        </div>
      </div>
      <Button className={styles.menulogo} type="text">
        <MenuOutlined />
      </Button>
    </Header>
  );
}
