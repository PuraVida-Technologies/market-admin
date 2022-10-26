import "antd/dist/antd.css";
import { Layout } from "antd";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import TopMenu from "@/components/nav/TopMenu";
import SideBar from "@/components/nav/SideBar";
import withAuth from "@/HOC/withAuth.js";

const { Content } = Layout;

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <Layout hasSider>
      <Head>
        <title>PuraVida</title>
        <meta name="description" content="PuraVida" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.siteLayout}>
        <TopMenu onclick={() => setIsSideBarOpen(true)} />
        {/* <Navbar /> */}
        <Content className={styles.content}>{props.children}</Content>
        <SideBar onClick={closeSideBar} open={isSideBarOpen} />
      </Layout>
    </Layout>
  );
};

export default withAuth(MainLayout);
