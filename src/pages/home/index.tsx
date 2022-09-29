import Card from "@/components/Card";
import MainLayout from "@/components/layouts/Main";
import { Col, Row } from "antd";
import { GetServerSideProps, NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <Card />
        </Col>
        <Col className="gutter-row" span={6}>
          <Card />
        </Col>
        <Col className="gutter-row" span={6}>
          <Card />
        </Col>
        <Col className="gutter-row" span={6}>
          <Card />
        </Col>
      </Row>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      page: 1,
    },
  };
};

export default HomePage;
