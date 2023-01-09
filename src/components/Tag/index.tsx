import "antd/dist/antd.css";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { format, parseISO } from "date-fns";
import { createAdminTag, Tag, tagsAdminService, TagsResponse } from "@/services/tag";
import { NextRouter, useRouter } from "next/router";
import { Col, Row, Table, Tag as TagComponent } from "antd";
import { Button, Modal, Input } from "antd";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TagActionsColumn from "../TagActionsColumn";
import { useMutation } from "@apollo/client";
import { uploadFileMutation } from "@/services/upload";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import UpdateTagModal from "./UpdateTagModal";

interface ITagProps {
  pageSize: number;
  page: number;
  total: number;
}

export default function TagView(props: ITagProps): JSX.Element {
  const { page, pageSize, total } = props;

  const [selectedTag, setSelectedTag] = useState(null);
  const [isUpdateTagModalOpen, setIsUpdateTagModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [englishName, setEnglishName] = useState("");
  const [spanishName, setSpanishName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
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
    if (selectedTag) setIsUpdateTagModalOpen(true);
  }, [selectedTag]);

  useEffect(() => {
    if (englishName && spanishName && imageUrl) {
      setIsDisabled(false);
    }
  }, [englishName, spanishName, imageUrl]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    createAdminTag({
      names: [
        { language: "en-us", name: englishName },
        { language: "es-spa", name: spanishName },
      ],
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetThenClose();
  };

  const router: NextRouter = useRouter();
  const [tags, setTags] = useState<TagsResponse>();

  useEffect(() => {
    if (!isModalOpen) {
      tagsAdminService({ limit: pageSize, page }).then((response) => {
        setTags(response);
      });
    }
  }, [pageSize, page, router, isModalOpen, isUpdateTagModalOpen]);

  const handleOnChange = (page: TablePaginationConfig) => {
    const { pageSize, current } = page;

    if (pageSize || current) {
      router.query.page = `${current}`;
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  };
  const uploadButton = (
    <div>
      {isImageUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{isImageUploading ? "Uploading" : "Upload"}</div>
    </div>
  );

  const statusClass: { [key: string]: string } = {
    approved: styles.approvedStatus,
    rejected: styles.rejectedStatus,
    pending: styles.pendingStatus,
  };

  const columns: ColumnsType<Tag> = [
    {
      title: "Name",
      dataIndex: "names",
      key: "name",
      render: (names): ReactNode => {
        return <>{names[0].name}</>;
      },
      fixed: "left",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val): ReactNode => {
        const d = parseISO(val);
        const formatted = format(d, "HH:mm MM/dd/yy");
        return <>{formatted}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <TagComponent className={statusClass[status?.toLowerCase() || "approved"]}>{status}</TagComponent>
      ),
    },
    {
      title: "Actions",
      ellipsis: true,
      key: "operations",
      align: "center",
      render: (tag) => {
        if (tag.status === "pending") {
          const onClick = () => setSelectedTag(tag);
          return <TagActionsColumn {...{ onClick }} />;
        }
        return null;
      },
    },
  ];

  return (
    <>
      <Button className={styles.createNewTag} type="primary" onClick={showModal}>
        Create New Tag
      </Button>
      <Modal
        title="Create Tag"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk} disabled={isDisabled}>
            Add
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
      </Modal>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          {tags?.data?.length && (
            <Table
              dataSource={tags?.data}
              columns={columns}
              onChange={handleOnChange}
              scroll={{ x: 520 }}
              pagination={{
                defaultCurrent: page,
                defaultPageSize: pageSize,
                total: tags?.pagination?.total || total,
                showSizeChanger: true,
                pageSizeOptions: [12, 24, 48, 96],
              }}
            />
          )}
        </Col>
      </Row>
      <UpdateTagModal
        isModalOpen={isUpdateTagModalOpen}
        setIsModalOpen={setIsUpdateTagModalOpen}
        selectedTag={selectedTag as unknown as Tag}
        {...{ setSelectedTag }}
      />
    </>
  );
}
