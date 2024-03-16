import { useState } from "react";
import { useTodoStore } from "@/utils/store";
import dateTime from "@/utils/moment";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { setColor } from "@/utils/category-color";
import type { Props as ContentDoingProps, EditingProps } from "@/utils/types";

const initialEditingState: EditingProps = {
  todoId: "",
  isEdit: false,
  text: "",
};

export default function ContentDoing({ decodeToken }: ContentDoingProps) {
  const contentStatus = "doing";
  const doing = useTodoStore((state) => state.todos?.filter((item: any) => item.status === "doing"));
  const createTodo = useTodoStore((state) => state.createTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const [editing, setEditing] = useState(initialEditingState);
  const [hoveredCategory, setHoveredCategory] = useState<string>("");

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
    setEditing(initialEditingState); // reset state edit
  }

  async function handleRemoveTodo(todo: any) {
    removeTodo({
      todo_id: todo.todo_id,
      user_id: decodeToken.user_id,
    });
  }

  function handleRemoveCategory(todo: any, categoryName: string) {
    const { todo_id, category } = todo;
    const filteredCategory = category.filter((item: string) => item !== categoryName);
    updateTodo({
      todo_id,
      category: filteredCategory.length > 0 ? filteredCategory : ["Uncategorized"], // if custom category is not set, set default with "Uncategorized"
      user_id: decodeToken.user_id,
    });
  }

  function dropTodo(ev: any) {
    ev.preventDefault();
    // check format data is "todo_id"
    if (ev.dataTransfer.types.includes("todo_id")) {
      const todo_id = ev.dataTransfer.getData("todo_id");
      updateTodo({
        todo_id,
        status: contentStatus,
        user_id: decodeToken.user_id,
      });
    }
  }

  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  function dragTodo(ev: any) {
    ev.dataTransfer.setData("todo_id", ev.currentTarget.id);
  }

  function dropCategory(ev: any) {
    ev.preventDefault();
    // check format data is "category"
    if (ev.dataTransfer.types.includes("category")) {
      const categoryName = ev.dataTransfer.getData("category");
      const todo_id = ev.currentTarget.id;
      const currentCategories = Array.from(ev.currentTarget.children)
        .map((elem: any) => elem.innerText)
        .filter((category) => category !== "Uncategorized") // remove "Uncategorized"
        .filter((category) => category !== categoryName); // remove same category name
      updateTodo({
        todo_id,
        category: [...currentCategories, categoryName],
        user_id: decodeToken.user_id,
      });
    }
  }

  return (
    <div className={`card w-full shadow-xl bg-gray-700 rounded-md`}>
      <div className="card-body px-[1.5rem] py-[1rem] text-white" onDrop={dropTodo} onDragOver={allowDrop}>
        <h2 className="card-title">Doing</h2>
        {doing &&
          doing.map((todo) => {
            return (
              <div draggable onDragStart={dragTodo} id={todo.todo_id} key={todo.todo_id} className={`card bg-base-100 shadow-xl rounded-md select-none`}>
                <div className="card-body px-[1rem] py-[1rem] text-white">
                  <h2 className="card-title flex-nowrap overflow-y-auto pb-1" id={todo.todo_id} onDrop={dropCategory} onDragOver={allowDrop} style={{ scrollbarWidth: "none" }}>
                    {todo.category &&
                      todo.category.map((item: any, index: any) => (
                        <div onMouseEnter={() => setHoveredCategory(item)} onMouseLeave={() => setHoveredCategory("")} key={index} className={`${setColor(item)} flex items-center gap-x-1 !rounded select-none font-semibold`}>
                          <span>{item}</span>
                          {hoveredCategory === item && hoveredCategory !== "Uncategorized" && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3 cursor-pointer" onClick={() => handleRemoveCategory(todo, item)}>
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                          )}
                        </div>
                      ))}
                  </h2>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-11">
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
