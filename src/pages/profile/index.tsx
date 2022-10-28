import MainLayout from "@/components/layouts/Main";
import styles from "./styles.module.scss";
import { NextPage } from "next";
import Image from "next/image";
import ChangePasswordModal from "@/components/modals/ChangePassword";
import { useState } from "react";
import { customStyles2, mobCustomStyles2 } from "@/util/modalStyle";
import { useMediaQuery } from "react-responsive";
const ProfilePage: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div>
      <MainLayout>
        <div>
          <div className={styles.centerContainer}>
            <div className={styles.avatarContainer}>
              <Image src="/icons/social_profile.svg" alt="admin" width={120} height={120} />
            </div>
          </div>
          <p className={styles.nameTag}>Milad Fahmy</p>
          <p className={styles.captionTag}>miladezzat.f@gmail.com</p>
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
    </div>
  );
};

export default ProfilePage;
