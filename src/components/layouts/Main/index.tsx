import "antd/dist/antd.css";
import { Layout } from "antd";
import Head from "next/head";
import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import TopMenu from "@/components/nav/TopMenu";

const { Content } = Layout;

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps): JSX.Element {
  return (
    <Layout hasSider>
      <Head>
        <title>PuraVida</title>
        <meta name="description" content="PuraVida" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.siteLayout}>
        <TopMenu />
        {/* <Navbar /> */}
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
