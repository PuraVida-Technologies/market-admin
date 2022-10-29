import { Col, Row, Pagination } from "antd";
import { customStyles } from "@/util/modalStyle";
import { getPostDetails, Post, postAdminService, PostsResponse } from "@/services/post";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import CustomCard from "@/components/CustomCard";
import FilterBar from "@/components/FilterBar";
import MainLayout from "@/components/layouts/Main";
import ProductModal from "@/components/modals/ProductModal";
import React, { useEffect, useState } from "react";

const Dashboard: NextPage = ({
  total,
  page,
  pageSize,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router: NextRouter = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postDetails, setPostDetails] = useState<Post>({});
  const [posts, setPosts] = useState<PostsResponse>();

  function onChangePagination(page: number, pageSize: number) {
    console.log({ page, pageSize });
    if (page) {
      router.query.page = `${page}`;
    }

    if (pageSize) {
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  }

  function openModal(id?: string) {
    if (id) {
      router.query.id = id;
      router.query.isModalOpen = "true";
      router.push(router);
    }

    setIsOpen(true);
  }

  useEffect(() => {
    if (router.query.id && router.query.isModalOpen) {
      setIsOpen(true);
      getPostDetails(router.query.id as string).then((_postDetails) => setPostDetails(_postDetails));
    }
  }, [router]);

  function closeModal() {
    // 👇️ delete each query param
    delete router.query["id"];
    delete router.query["isModalOpen"];

    // 👇️ update state after
    router.push(router, undefined, { shallow: true });

    setIsOpen(false);
  }

  useEffect(() => {
    postAdminService({ limit: pageSize, page }).then((data) => {
      setPosts(data);
    });
  }, [pageSize, page]);

  return (
    <MainLayout>
      <FilterBar />
      <Row gutter={[16, 16]}>
        {posts?.data?.map((post) => {
          return (
            <Col className="gutter-row" span={6} xs={24} sm={12} md={12} lg={8} xl={6} key={post._id}>
              <CustomCard viewDetail={openModal} post={post} />
            </Col>
          );
        })}
      </Row>
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
      <ProductModal
        postDetails={postDetails}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
      />
      ;
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  return {
    props: {
      total: query.total ? +query.total : 1,
      page: query.page ? +query.page : 1,
      pageSize: query.pageSize ? +query.pageSize : 12,
    },
  };
};

export default Dashboard;
