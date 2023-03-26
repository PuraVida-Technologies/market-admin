import "antd/dist/antd.css";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { format, parseISO } from "date-fns";
import { createAdminTag, Tag, tagsAdminService, TagsResponse } from "@/services/tag";
import { NextRouter, useRouter } from "next/router";
import { Col, Row, Table, Tag as TagComponent } from "antd";
import { Button, Modal, Input } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TagActionsColumn from "../TagActionsColumn";
import UpdateTagModal from "./UpdateTagModal";
import { LoadingSpinner } from "../Loading";

interface ITagProps {
  pageSize: number;
  page: number;
  total: number;
  order: string;
  status: string;
}

export default function TagView(props: ITagProps): JSX.Element {
  const { page, pageSize, total, order, status } = props;

  const [selectedTag, setSelectedTag] = useState(null);
  const [isUpdateTagModalOpen, setIsUpdateTagModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [englishName, setEnglishName] = useState("");
  const [spanishName, setSpanishName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (selectedTag) setIsUpdateTagModalOpen(true);
  }, [selectedTag]);

  useEffect(() => {
    if (englishName && spanishName && imageUrl) {
      setIsDisabled(false);
    }
  }, [englishName, spanishName, imageUrl]);

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
      tagsAdminService({ limit: pageSize, page, order, status }).then((response) => {
        setTags(response);
      });
    }
  }, [pageSize, page, router, isModalOpen, isUpdateTagModalOpen, order, status]);

  const handleOnChange = (page: TablePaginationConfig) => {
    const { pageSize, current } = page;

    if (pageSize || current) {
      router.query.page = `${current}`;
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  };

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
    <div className={styles.container}>
      {tags?.data ? (
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
          </Modal>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Table
                loading={loading}
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
            </Col>
          </Row>
          <UpdateTagModal
            isModalOpen={isUpdateTagModalOpen}
            setIsModalOpen={setIsUpdateTagModalOpen}
            selectedTag={selectedTag as unknown as Tag}
            {...{ setSelectedTag }}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
