import "antd/dist/antd.css";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { format, parseISO } from "date-fns";
import { getTagDetails, Tag, tagsAdminService, TagsResponse } from "@/services/tag";
import { NextRouter, useRouter } from "next/router";
import { Col, Row, Table, Tag as TagComponent } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TagActionsColumn from "../TagActionsColumn";

interface ITagProps {
  pageSize: number;
  page: number;
  total: number;
}

export default function TagView(props: ITagProps): JSX.Element {
  const { page, pageSize, total } = props;
  console.log({ page, pageSize, total });

  const router: NextRouter = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tagsDetails, setTagDetails] = useState<Tag>({});
  const [tags, setTags] = useState<TagsResponse>();

  useEffect(() => {
    if (router.query.id && router.query.isModalOpen) {
      setIsOpen(true);
      getTagDetails(router.query.id as string).then((_tagsDetails) => setTagDetails(_tagsDetails));
    }
  }, [router]);

  useEffect(() => {
    if (router.query.isModalOpen !== "true") {
      tagsAdminService({ limit: pageSize, page }).then((response) => {
        setTags(response);
      });
    }
  }, [pageSize, page, router]);

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
      dataIndex: "name",
      key: "name",
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
      render: TagActionsColumn,
      fixed: "right",
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        {tags?.data?.length && (
          <Table
            dataSource={tags?.data}
            columns={columns}
            onChange={handleOnChange}
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
  );
}
