import React, { FC, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { Spin } from "antd";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { notify } from "@/util/alertMessage";
import { updatePassword } from "@/services/auth";


interface ChangePasswordModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles: any;
}
const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ modalIsOpen, closeModal, customStyles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { push } = useRouter();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function handleSubmit() {
    setIsLoading(true);
    const response = await updatePassword(oldPassword, newPassword, repeatPassword);
    if (response?.data) {
      notify("Password Update Successfully", "success");
      setIsLoading(false);
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
      localStorage.removeItem("auth");
      push("/login");
    } else {
      notify("An error occurred", "error");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div onClick={closeModal} className="custom-cursor">
              <Image src={"/icons/cancel.svg"} width={30} height={30} alt="cancel" />
            </div>
          </div>
          <div className={styles.formContainer}>
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
            <button className={styles.customBlueBtn} onClick={handleSubmit}>
              Change Password                
              {isLoading && <Spin style={{ color: "#fff", marginLeft: "1rem" }} indicator={antIcon} />}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
