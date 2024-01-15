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
import { badgeButton } from "@/utils/category-color";

function Home({ jwtToken, decodeToken }: HomeProps) {
  const todos = useTodoStore((state) => state.todos);
  const storeTodos = useTodoStore((state) => state.storeTodos);
  const selectedTodo = useTodoStore((state) => state.setTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  async function getTodos() {
    const result = await axiosClient.get(`/api/todos/${decodeToken.user_id}`, {
      headers: { Authorization: jwtToken },
    });
    const { data } = result.data;
    storeTodos(data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleDragEnd(e: any) {
    e.preventDefault();
    if (selectedTodo.todo_id || selectedTodo.user_id) {
      // remove uncategorized
      const isUncategorized = selectedTodo.category.some((item: any) => {
        return item === badgeButton[0].name;
      });
      if (isUncategorized) {
        selectedTodo.category = [];
      }

      // check exist category
      const isCategoryExist = selectedTodo.category.some((item: any) => {
        return item === e.target.innerText;
      });
      if (!isCategoryExist) {
        selectedTodo.category?.push(e.target.innerText);
        updateTodo({
          category: selectedTodo.category,
          todo_id: selectedTodo.todo_id,
          user_id: selectedTodo.user_id,
        });
      }
    }
  }

  if (!todos) return "Loading...";
  return (
    <Layout>
      <div className="my-[2rem] px-[3rem]">
        <div className="mb-3 flex flex-wrap gap-3">
          {badgeButton.map((btn, index) => (
            <div key={index} className={`${btn.colorClass} rounded-md cursor-grab select-none font-semibold`} draggable onDragEnd={handleDragEnd}>
              {btn.name}
            </div>
          ))}
        </div>
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
