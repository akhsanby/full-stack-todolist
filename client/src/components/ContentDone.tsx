import { useState } from "react";
import { useTodoStore } from "@/utils/store";
import dateTime from "@/utils/moment";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { setColor } from "@/utils/category-color";
import type { Props as ContentDoneProps, EditingProps } from "@/utils/types";

const initialEditingState: EditingProps = {
  todoId: "",
  isEdit: false,
  text: "",
};

export default function Contentdone({ decodeToken }: ContentDoneProps) {
  const contentStatus = "done";
  const done = useTodoStore((state) => state.todos?.filter((item: any) => item.status === "done"));
  const createTodo = useTodoStore((state) => state.createTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const selectedTodo = useTodoStore((state) => state.setTodo);

  const [editing, setEditing] = useState(initialEditingState);

  function handleEditing(todo: any) {
    setEditing({
      todoId: todo.todo_id,
      isEdit: true,
      text: todo.text,
    });
  }

  const handleCreateTodo = async () => {
    createTodo({
      todo_id: uuid(),
      status: contentStatus,
      category: ["Uncategorized"],
      text: faker.lorem.words(3),
      user_id: decodeToken.user_id,
      createdAt: dateTime,
    });
  };

  async function handleUpdateTodoText() {
    updateTodo({
      todo_id: editing.todoId,
      text: editing.text,
      user_id: decodeToken.user_id,
    });
    setEditing(initialEditingState);
  }

  async function handleRemoveTodo(todo: any) {
    removeTodo({
      todo_id: todo.todo_id,
      user_id: decodeToken.user_id,
    });
  }

  function handleDragOverCategory(e: any, todo: any) {
    e.preventDefault();
    selectedTodo.todo_id = todo.todo_id;
    selectedTodo.category = todo.category;
    selectedTodo.user_id = todo.user_id;
  }

  function handleDragLeaveCategory(e: any) {
    e.preventDefault();
    selectedTodo.todo_id = "";
    selectedTodo.category = [];
    selectedTodo.user_id = "";
  }

  return (
    <div className={`card w-full shadow-xl bg-gray-700 rounded-md`}>
      <div className="card-body px-[1.5rem] py-[1rem] text-white">
        <h2 className="card-title">Done</h2>
        {done &&
          done.map((todo) => {
            return (
              <div key={todo.todo_id} className={`card bg-base-100 shadow-xl rounded-md select-none`}>
                <div className="card-body px-[1rem] py-[1rem] text-white">
                  <h2 className="card-title flex-wrap" onDragOver={(e) => handleDragOverCategory(e, todo)} onDragLeave={handleDragLeaveCategory}>
                    {todo.category.map((item: any, index: any) => (
                      <div key={index} className={`${setColor(item)} rounded-md cursor-grab select-none font-semibold`}>
                        {item}
                      </div>
                    ))}
                  </h2>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-5">
                      <div onClick={() => handleEditing(todo)}>{editing.isEdit && editing.todoId === todo.todo_id ? <input type="text" onBlur={() => handleUpdateTodoText()} onChange={(e) => setEditing({ ...editing, text: e.target.value })} autoFocus placeholder="Type here" value={editing.text} className="input w-full" /> : <span className="text-wrap">{todo.text}</span>}</div>
                    </div>
                    <div className="justify-self-end place-self-center tooltip tooltip-error" data-tip="Remove">
                      <svg onClick={() => handleRemoveTodo(todo)} className="fill-error cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs">{todo.createdAt}</span>
                </div>
              </div>
            );
          })}
        <button className="btn btn-block bg-gray-700 text-white" onClick={handleCreateTodo}>
          <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <span>Add another card</span>
        </button>
      </div>
    </div>
  );
}
