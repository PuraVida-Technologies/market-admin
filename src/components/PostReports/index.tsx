import "antd/dist/antd.css";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { format, parseISO } from "date-fns";
import {
  getPostReportsAdminService,
  PostReport,
  PostReportsResponse,
  ignorePostReportAdminService,
  Post,
} from "@/services/post";
import { NextRouter, useRouter } from "next/router";
import { Col, Row, Table } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import PostReportsActionsColumn from "../PostReportsActionsColumn";
import { notify } from "@/util/alertMessage";
import ConfirmDeletePostModal from "./ConfirmDeletePostModal";

interface IPostReportsProps {
  pageSize: number;
  page: number;
  total: number;
  order: string;
}

export default function PostReportsView(props: IPostReportsProps): JSX.Element {
  const { page, pageSize, total, order } = props;

  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isConfirmDeletePostModalOpened, setIsConfirmDeletePostModalOpened] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const ignorePostReport = (reportId: string) => {
    setIsLoading(true);
    ignorePostReportAdminService(reportId)
      .then(() => {
        setIsLoading(false);
        setSelectedReport(null);
        notify("Report Ignored", "success");
      })
      .catch(() => {
        notify("Can't Ignore Report", "error");
      });
  };

  const router: NextRouter = useRouter();
  const [reports, setReports] = useState<PostReportsResponse>();

  useEffect(() => {
    if (selectedPost) setIsConfirmDeletePostModalOpened(true);
  }, [selectedPost]);
  useEffect(() => {
    getPostReportsAdminService({ limit: pageSize, page, order }).then((response) => {
      setReports(response);
    });
  }, [pageSize, page, router, order, selectedReport, isConfirmDeletePostModalOpened]);

  const handleOnChange = (page: TablePaginationConfig) => {
    const { pageSize, current } = page;

    if (pageSize || current) {
      router.query.page = `${current}`;
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  };

  const columns: ColumnsType<PostReport> = [
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
      render: (post): ReactNode => {
        const postUrl = `dashboard?id=${post._id}&isModalOpen=true`;
        return (
          <>
            <a href={postUrl}>{post.name}</a>
          </>
        );
      },
      fixed: "left",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
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
      title: "Actions",
      ellipsis: true,
      key: "operations",
      align: "center",
      render: (report) => {
        const ignoreReportClick = () => {
          setSelectedReport(report._id);
          ignorePostReport(report._id);
        };
        const deletePostClick = () => {
          setSelectedPost(report.post);
        };
        return <PostReportsActionsColumn ignoreReportClick={ignoreReportClick} deletePostClick={deletePostClick} />;
      },
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Table
            loading={loading}
            dataSource={reports?.data}
            columns={columns}
            onChange={handleOnChange}
            scroll={{ x: 520 }}
            pagination={{
              defaultCurrent: page,
              defaultPageSize: pageSize,
              total: reports?.pagination?.total || total,
              showSizeChanger: true,
              pageSizeOptions: [12, 24, 48, 96],
            }}
          />
        </Col>
      </Row>
      <ConfirmDeletePostModal
        isModalOpen={isConfirmDeletePostModalOpened}
        setIsModalOpen={setIsConfirmDeletePostModalOpened}
        setSelectedPost={setSelectedPost}
        selectedPost={selectedPost as unknown as Post}
      />
    </>
  );
}
