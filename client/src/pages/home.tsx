import Layout from "@/components/Layout";
import nookies from "nookies";
import { jwtDecode } from "jwt-decode";
import axiosClient from "@/utils/api";
import axios from "axios";
import { useEffect } from "react";
import { useTodoStore } from "@/utils/store";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import type { Props as HomeProps, Todo } from "@/utils/types";
import { ToastContainer } from "react-toastify";

import ContentTodo from "@/components/ContentTodo";
import ContentDoing from "@/components/ContentDoing";
import ContentDone from "@/components/ContentDone";
import WrapperCategoryList from "@/components/WrapperCategoryList";

function Home({ jwtToken, decodeToken, resultTodos }: HomeProps) {
  const todos = useTodoStore((state: any) => state.todos);
  const moveTodo = useTodoStore((state: any) => state.moveTodo);
  const storeTodos = useTodoStore((state: any) => state.storeTodos);

  useEffect(() => {
    storeTodos(resultTodos);
  }, []);

  function onDragEnd(result: any) {
    result.draggableId = JSON.parse(result.draggableId);
    const { destination, source, draggableId } = result;
    const { todo_id } = draggableId;

    // Check if the draggable item is dropped outside the droppable area
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceTodo = todos[source.droppableId].filter((todo: Todo) => todo.todo_id !== todo_id);
      draggableId.status = destination.droppableId; // change status
      const destinationTodo = [...todos[destination.droppableId], draggableId];
      moveTodo({
        ...todos,
        [source.droppableId]: sourceTodo,
        [destination.droppableId]: destinationTodo,
      });

      // reorder position in array
      const draggableTodoIndex = todos[destination.droppableId].indexOf(todo_id);
      const [reOrdered] = todos[destination.droppableId].splice(draggableTodoIndex, 1);
      todos[destination.droppableId].splice(destination.index, 0, reOrdered);

      // change key "position" in array
      todos[source.droppableId].forEach((todo: Todo, index: number) => {
        todo.position = index;
      });

      todos[destination.droppableId].forEach((todo: Todo, index: number) => {
        todo.position = index;
      });
    } else {
      const [reOrdered] = todos[source.droppableId].splice(source.index, 1);
      todos[source.droppableId].splice(destination.index, 0, reOrdered);
    }
  }

  return (
    <Layout>
      <div className="relative x-[1rem] md:px-[3rem]">
        <WrapperCategoryList jwtToken={jwtToken} decodeToken={decodeToken} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-nowrap overflow-x-auto gap-3 justify-items-center">
            <ContentTodo decodeToken={decodeToken} />
            <ContentDoing decodeToken={decodeToken} />
            <ContentDone decodeToken={decodeToken} />
          </div>
        </DragDropContext>
      </div>
      <ToastContainer closeButton={false} />
    </Layout>
  );
}

export default Home;

export async function getServerSideProps(context: any) {
  const { token } = nookies.get(context);
  const decodeToken = jwtDecode(token) as {
    user_id: string;
    username: string;
  };
  resetServerContext();

  let result;
  if (process.env.USE_DOCKER) {
    result = await axios.get(`http://backend_container:8000/api/todos/${decodeToken.user_id}`, {
      headers: { Authorization: token },
    });
  } else {
    result = await axiosClient.get(`api/todos/${decodeToken.user_id}`, {
      headers: { Authorization: token },
    });
  }
  const { data } = result.data;

  return { props: { jwtToken: token, decodeToken, resultTodos: data } };
}
