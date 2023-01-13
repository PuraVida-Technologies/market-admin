import styles from "./styles.module.scss";
import { NextPage } from "next";
import Image from "next/image";
import ChangePasswordModal from "@/components/modals/ChangePassword";
import { useEffect, useState } from "react";
import { customStyles2, mobCustomStyles2 } from "@/util/modalStyle";
import { useMediaQuery } from "react-responsive";
import { AuthResponse } from "@/services/auth";
import withAuth from "@/HOC/withAuth";

import dynamic from "next/dynamic";
const MainLayout = dynamic(() => import("@/components/layouts/Main"), {
  ssr: false,
});

const ProfilePage: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState<AuthResponse["data"]>();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    const user = sessionStorage.getItem("auth");
    setAuth(JSON.parse(user || "{}").auth);
  }, []);

  return (
    <MainLayout>
      <div>
        <div className={styles.centerContainer}>
          <div className={styles.avatarContainer}>
            <Image src="/icons/social_profile.svg" alt="admin" width={120} height={120} />
          </div>
        </div>
        <p className={styles.nameTag}>{auth?.user?.name}</p>
        <p className={styles.captionTag}>{auth?.user?.email}</p>
        <div className={styles.centerContainer}>
          <button onClick={openModal} className={styles.changePasswoedBtn}>
            Change Password
          </button>
        </div>
      </div>
      <ChangePasswordModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={isTabletOrMobile ? mobCustomStyles2 : customStyles2}
      />
    </MainLayout>
  );
};

export default withAuth(ProfilePage);
