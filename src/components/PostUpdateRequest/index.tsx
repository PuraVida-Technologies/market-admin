import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import {
  Post,
  getUpdatePostsRequests,
  PostsResponse,
  getSingleUpdatePostsRequest,
} from "@/services/updatePostsRequests";
import { Col, Empty, Pagination, Row } from "antd";
import UpdatePostRequestCard from "@/components/UpdatePostRequestCard";
import UpdatePostRequestModal from "../modals/UpdatePostRequestModal";
import { customStyles } from "@/util/modalStyle";
import { PostData } from "@/services/updatePostsRequests";
import { LoadingSpinner } from "../Loading";
import styles from "./styles.module.scss";

interface IPostProps {
  pageSize: number;
  page: number;
  total: number;
  order: string;
}

export default function PostUpdateRequestView(props: IPostProps): JSX.Element {
  const { page, pageSize, total, order } = props;
  const router: NextRouter = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postDetails, setPostDetails] = useState<Post>({});
  const [posts, setPosts] = useState<PostsResponse>();

  function openModal(id?: string) {
    if (id) {
      router.query.id = id;
      router.query.isModalOpen = "true";
      router.push(router);
    }

    setIsOpen(true);
  }

  function closeModal() {
    // 👇️ delete each query param
    delete router.query["id"];
    delete router.query["isModalOpen"];

    // 👇️ update state after
    router.push(router, undefined, { shallow: true });

    setIsOpen(false);
  }

  useEffect(() => {
    if (router.query.id && router.query.isModalOpen) {
      setIsOpen(true);
      getSingleUpdatePostsRequest(router.query.id as string).then((_postDetails) => setPostDetails(_postDetails));
    }
  }, [router]);

  useEffect(() => {
    if (router.query.isModalOpen !== "true") {
      getUpdatePostsRequests({ limit: pageSize, page, order }).then((data) => {
        setPosts(data);
      });
    }
  }, [pageSize, page, router, order]);

  function onChangePagination(page: number, pageSize: number) {
    if (page) {
      router.query.page = `${page}`;
    }

    if (pageSize) {
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  }

  return (
    <div className={styles.container}>
      {posts?.data ? (
        <>
          <Row gutter={[16, 16]}>
            {posts?.data?.map((post) => {
              return (
                <Col className="gutter-row" span={6} xs={24} sm={12} md={12} lg={8} xl={6} key={post._id}>
                  <UpdatePostRequestCard viewDetail={openModal} post={post?.postData as PostData} />
                </Col>
              );
            })}
          </Row>

          {posts?.data?.length ? (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", marginTop: "1rem" }}>
              <Pagination
                className="pagination"
                defaultCurrent={page}
                defaultPageSize={pageSize}
                total={posts?.pagination?.total || total}
                responsive
                onChange={onChangePagination}
                pageSizeOptions={[12, 24, 48, 96]}
              />
            </div>
          ) : (
            <Empty />
          )}
          <UpdatePostRequestModal
            postDetails={(postDetails.postData as Post) || {}}
            postRequestId={postDetails._id as string}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            customStyles={customStyles}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
