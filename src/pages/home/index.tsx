import MainLayout from "@/components/layouts/Main";
import { GetServerSideProps, NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <p>Home</p>
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
