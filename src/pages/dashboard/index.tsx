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
  const { total, page, pageSize, defaultView, defaultSort } = props;
  const [view, setView] = useState(defaultView);
  const [sort, setSort] = useState(defaultSort);
  const router: NextRouter = useRouter();

  function handleView(view: string) {
    if (Object.values(DASHBOARD.views).includes(view)) {
      setView(view);
      const updatedRouter = { ...router };
      updatedRouter.query.view = view;
      router.push(updatedRouter, undefined, { shallow: false });
    }
  }

  function handleSort(sort: string) {
    if (Object.values(DASHBOARD.sortings).includes(sort)) {
      setSort(sort);
      const updatedRouter = { ...router };
      updatedRouter.query.sort = sort;
      router.push(updatedRouter, undefined, { shallow: false });
    }
  }

  const Views = {
    [DASHBOARD.views.post]: <PostView page={page} total={total} pageSize={pageSize} order={defaultSort} />,
    [DASHBOARD.views.tag]: <TagView page={page} total={total} pageSize={pageSize} order={defaultSort} />,
    [DASHBOARD.views.map]: <MapView />,
    [DASHBOARD.views.updatePostRequest]: (
      <PostUpdateRequestView page={page} total={total} pageSize={pageSize} order={defaultSort} />
    ),
  };

  useEffect(() => {
    if (Object.values(DASHBOARD.views).includes(view)) {
      setView(view);
    }
  }, [view]);
  useEffect(() => {
    if (Object.values(DASHBOARD.sortings).includes(sort)) {
      setSort(sort);
    }
  }, [sort]);

  return (
    <MainLayout>
      <FilterBar handleView={handleView} handleSort={handleSort} />
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
      defaultSort: query.sort ? query.sort : DASHBOARD.sortings.ascending,
    },
  };
};

export default Dashboard;
