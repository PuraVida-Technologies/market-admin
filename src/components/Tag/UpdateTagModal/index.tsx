import "antd/dist/antd.css";
import { Tag, TagNameObj, approveOrRejectAdminTag } from "@/services/tag";
import { Button, Modal, Input, Radio, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useMutation } from "@apollo/client";
import { uploadFileMutation } from "@/services/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { RadioChangeEvent } from "antd";

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
  const [isImageUploading, setIsImageUploading] = useState(false);
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

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setIsImageUploading(true);
      return;
    }
    if (info.file.status === "done") {
      onDrop(info.file.originFileObj as File);
    }
  };

  useEffect(() => {
    if ((englishName || spanishName) && tagStatus) {
      setIsDisabled(false);
    }
  }, [englishName, spanishName, tagStatus]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const [uploadFile] = useMutation(uploadFileMutation);
  const onDrop = useCallback(
    (file: File) => {
      uploadFile({ variables: { file } }).then((res) => {
        setImageUrl(res?.data?.uploadFile?.url);
      });
    },
    [uploadFile]
  );

  const handleOk = () => {
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
  };

  const resetThenClose = () => {
    setIsLoading(false);
    setIsImageUploading(false);
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

  const uploadButton = (
    <div>
      {isImageUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{isImageUploading ? "Uploading" : "Upload"}</div>
    </div>
  );

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
          Edit
        </Button>,
      ]}
    >
      <div className={styles.inputContainer}>
        <p>English Name:</p>
        <Input value={englishName} onChange={(e) => setEnglishName(e.target.value)} />
      </div>
      <div className={styles.inputContainer}>
        <p>Spanish Name:</p>
        <Input value={spanishName} onChange={(e) => setSpanishName(e.target.value)} />
      </div>
      <div className={styles.inputContainer}>
        <p>Tag Icon:</p>
        <Upload
          name="tag"
          listType="picture-card"
          className="tag-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="tag" style={{ width: "100%" }} /> : uploadButton}
        </Upload>
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
