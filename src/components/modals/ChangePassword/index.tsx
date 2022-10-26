import React, { FC, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "./styles.module.scss";

interface ChangePasswordModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: any;
}
const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ modalIsOpen, closeModal, customStyles }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div onClick={closeModal} className="custom-cursor">
              <Image src={"/icons/cancel.svg"} width={30} height={30} alt="cancel" />
            </div>
          </div>
          <form className={styles.formContainer}>
            <div className={styles.customForm}>
              <label htmlFor="oldPassword">Old Password</label>
              <input
                className={styles.customInput}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                type={"password"}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className={styles.customForm}>
              <label htmlFor="newPassword">New Password</label>
              <input
                className={styles.customInput}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                type={"password"}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.customForm}>
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                className={styles.customInput}
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                type={"password"}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <button className={styles.customBlueBtn}>Change Password</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
