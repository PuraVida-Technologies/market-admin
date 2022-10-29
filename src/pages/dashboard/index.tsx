import CustomCard from "@/components/CustomCard";
import MainLayout from "@/components/layouts/Main";
import FilterBar from "@/components/FilterBar";
import { Col, Row, Pagination } from "antd";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import ProductModal from "@/components/modals/ProductModal";
import { customStyles } from "@/util/modalStyle";
import { postAdminService, PostsResponse } from "@/services/post";

const Dashboard: NextPage = ({
  total,
  page,
  pageSize,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router: NextRouter = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<PostsResponse>();

  function onChangePagination(page: number, pageSize: number) {
    if (page) {
      router.query.page = `${page}`;
    }

    if (pageSize) {
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  }

  function openModal(slug?: string) {
    if (slug) {
      router.query.slug = slug;
      router.push(router);
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [selectedIdx, setSelectedIdx] = useState(1);

  useEffect(() => {
    console.log({ pageSize, page });

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
            <Col className="gutter-row" span={6} xs={24} sm={6} md={12} lg={6} key={post._id}>
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
        />
      </div>
      <ProductModal
        setSelectedIdx={setSelectedIdx}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        selectedIdx={selectedIdx}
      />
      ;
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;

  return {
    props: {
      total: query.total || 100,
      page: query.page || 1,
      pageSize: query.pageSize || 10,
    },
  };
};

export default Dashboard;
