import "antd/dist/antd.css";
import { Tag, TagNameObj, approveOrRejectAdminTag } from "@/services/tag";
import { Button, Modal, Input, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import type { RadioChangeEvent } from "antd";
import { toast } from "react-toastify";

interface UpdateTagModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: null) => void;
}

export default function UpdateTagModal({
  isModalOpen,
  setIsModalOpen,
  selectedTag,
  setSelectedTag,
}: UpdateTagModalProps): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [englishName, setEnglishName] = useState("");
  const [spanishName, setSpanishName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [tagStatus, setTagStatus] = useState(selectedTag?.status);

  const onChangeStatus = (e: RadioChangeEvent) => {
    setTagStatus(e.target.value);
  };

  useEffect(() => {
    if (selectedTag) {
      const { names, icon } = selectedTag;
      const englishName = (names as TagNameObj[])[0]?.name;
      const spanishhName = (names as TagNameObj[])[1]?.name;
      setEnglishName(englishName);
      setSpanishName(spanishhName);
      setImageUrl(icon);
    }
  }, [selectedTag]);

  useEffect(() => {
    if ((englishName || spanishName) && tagStatus) {
      setIsDisabled(false);
    }
  }, [englishName, spanishName, tagStatus]);

  const handleOk = () => {
    if (tagStatus === "approved" && (spanishName === "" || spanishName === undefined)) {
      toast.info("Spanish Name is Required");
    } else {
      setIsLoading(true);
      const names = [];
      if (englishName && englishName !== (selectedTag.names as TagNameObj[])[0]?.name) {
        names.push({ language: "en-us", name: englishName });
      }
      if (spanishName && spanishName !== (selectedTag.names as TagNameObj[])[1]?.name) {
        names.push({ language: "es-spa", name: spanishName });
      }
      approveOrRejectAdminTag({
        id: selectedTag._id,
        status: tagStatus as string,
        names,
        icon: imageUrl as string,
      }).then(() => {
        resetThenClose();
      });
    }
  };

  const resetThenClose = () => {
    setIsLoading(false);
    setEnglishName("");
    setSpanishName("");
    setImageUrl("");
    setTagStatus("");
    setSelectedTag(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetThenClose();
  };

  return (
    <Modal
      title="Update Tag"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk} disabled={isDisabled}>
          Save
        </Button>,
      ]}
    >
      <div className={`${styles.inputContainer} ${styles.textInputContainer}`}>
        <p>English Name:</p>
        <Input value={englishName} onChange={(e) => setEnglishName(e.target.value)} />
      </div>
      <div className={`${styles.inputContainer} ${styles.textInputContainer}`}>
        <p>Spanish Name:</p>
        <Input value={spanishName} onChange={(e) => setSpanishName(e.target.value)} />
      </div>
      {selectedTag?.status === "pending" && (
        <div className={styles.inputContainer}>
          <p>Status:</p>
          <Radio.Group onChange={onChangeStatus} value={tagStatus}>
            <Space direction="vertical">
              <Radio value="approved">Approve</Radio>
              <Radio value="rejected">Reject</Radio>
            </Space>
          </Radio.Group>
        </div>
      )}
    </Modal>
  );
}
