import styles from "./styles.module.scss";
import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Header } = Layout;

export default function TopMenu(): JSX.Element {
  return (
    <Header className={styles.header}>
      <div className={styles.logoConatainer}>
        <Link href="/home">
          <Image src="/assets/pvb-logo.svg" alt="PVB Logo" width={54} height={54} />
        </Link>
        <p>Bitcoin wallet market admin dashboard</p>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Image src="/assets/admin.svg" alt="admin" width={54} height={54} />
        </div>
        <div className={styles.text}>
          <p>Admin</p>
          <p>Good Morning!</p>
        </div>
        <div className={styles.notificationContainer}>
          <Image src="/assets/notification-icon.svg" alt="notification" width={24} height={24} />
          <div className={styles.notificationDot}></div>
        </div>
      </div>
    </Header>
  );
}
