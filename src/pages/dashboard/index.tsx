import CustomCard from "@/components/CustomCard";
import MainLayout from "@/components/layouts/Main";
import FilterBar from "@/components/FilterBar";
import { Col, Row, Pagination } from "antd";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import React, { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import ProductModal from "@/components/modals/ProductModal";
import { customStyles } from "@/util/modalStyle";

const Dashboard: NextPage = ({
  total,
  page,
  pageSize,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router: NextRouter = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  function onChangePagination(page: number, pageSize: number) {
    if (page) {
      router.query.page = `${page}`;
    }

    if (pageSize) {
      router.query.pageSize = `${pageSize}`;
    }

    router.push(router);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [selectedIdx, setSelectedIdx] = useState(1);

  return (
    <MainLayout>
      <FilterBar />
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
          <Col className="gutter-row" span={6} xs={24} sm={6} md={12} lg={6} key={index}>
            <CustomCard viewDetail={openModal} approved={index === 1 ? true : false} coverImage="/img/food-1.png" />
          </Col>
        ))}
      </Row>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", marginTop: "1rem" }}>
        <Pagination
          className="pagination"
          defaultCurrent={page}
          defaultPageSize={pageSize}
          total={total}
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
