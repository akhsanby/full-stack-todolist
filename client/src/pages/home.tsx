import Layout from "@/components/Layout";
import nookies from "nookies";
import { jwtDecode } from "jwt-decode";
import axiosClient from "@/utils/api";
import { useEffect } from "react";
import { useTodoStore } from "@/utils/store";
import type { Props as HomeProps } from "@/utils/types";

import ContentTodo from "@/components/ContentTodo";
import ContentDoing from "@/components/ContentDoing";
import ContentDone from "@/components/ContentDone";
import WrapperCategoryList from "@/components/WrapperCategoryList";

function Home({ jwtToken, decodeToken }: HomeProps) {
  const todos = useTodoStore((state) => state.todos);
  const storeTodos = useTodoStore((state) => state.storeTodos);

  function getTodos() {
    axiosClient
      .get(`/api/todos/${decodeToken.user_id}`, {
        headers: { Authorization: jwtToken },
      })
      .then((result) => {
        const { data } = result.data;
        storeTodos(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (!todos) return "Loading...";
  return (
    <Layout jwtToken={jwtToken} decodeToken={decodeToken}>
      <div className="my-[1rem] px-[3rem]">
        <WrapperCategoryList />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 justify-items-center">
          <ContentTodo decodeToken={decodeToken} />
          <ContentDoing decodeToken={decodeToken} />
          <ContentDone decodeToken={decodeToken} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;

export async function getServerSideProps(context: any) {
  const { token } = nookies.get(context);
  const decodeToken = jwtDecode(token);
  return { props: { jwtToken: token, decodeToken } };
}
