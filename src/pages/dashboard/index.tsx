import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import FilterBar from "@/components/FilterBar";
import PostView from "@/components/Post";
import { useEffect, useState } from "react";
import { DASHBOARD } from "@/common/constants";
import { NextRouter, useRouter } from "next/router";
import TagView from "@/components/Tag";
import MapView from "@/components/Map";
import PostUpdateRequestView from "@/components/PostUpdateRequest";

import dynamic from "next/dynamic";
const MainLayout = dynamic(() => import("@/components/layouts/Main"), {
  ssr: false,
});

const Dashboard: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { total, page, pageSize, defaultView } = props;
  const [view, setView] = useState(defaultView);
  const router: NextRouter = useRouter();

  function handleView(view: string) {
    if (Object.values(DASHBOARD.views).includes(view)) {
      setView(view);
      router.query = { view };
      router.push(router, undefined, { shallow: false });
    }
  }

  const Views = {
    [DASHBOARD.views.post]: <PostView page={page} total={total} pageSize={pageSize} />,
    [DASHBOARD.views.tag]: <TagView page={page} total={total} pageSize={pageSize} />,
    [DASHBOARD.views.map]: <MapView />,
    [DASHBOARD.views.updatePostRequest]: <PostUpdateRequestView page={page} total={total} pageSize={pageSize} />,
  };

  useEffect(() => {
    if (Object.values(DASHBOARD.views).includes(view)) {
      setView(view);
    }
  }, [view]);

  return (
    <MainLayout>
      <FilterBar handleView={handleView} />
      {Views[view]}
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
      defaultView: query.view ? query.view : DASHBOARD.views.post,
    },
  };
};

export default Dashboard;
