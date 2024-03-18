import { useState } from "react";
import { useTodoStore } from "@/utils/store";
import dateTime from "@/utils/moment";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { setColor } from "@/utils/category-color";
import type { Props as ContentDoingProps, EditingProps, Todo } from "@/utils/types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { dropCategory, allowDropCategory } from "@/utils/func";

const initialEditingState: EditingProps = {
  todo_id: "",
  isEdit: false,
  text: "",
};

export default function ContentDoing({ decodeToken }: ContentDoingProps) {
  const contentStatus = "doing";
  const doing = useTodoStore((state: any) => state.todos.doing);
  const createTodo = useTodoStore((state: any) => state.createTodo);
  const updateTodo = useTodoStore((state: any) => state.updateTodo);
  const removeTodo = useTodoStore((state: any) => state.removeTodo);

  const [editing, setEditing] = useState(initialEditingState);
  const [hoveredCategory, setHoveredCategory] = useState<string>("");

  function handleEditing(todo: Todo) {
    setEditing({
      todo_id: todo.todo_id,
      isEdit: true,
      text: todo.text,
    });
  }

  const handleCreateTodo = async () => {
    createTodo(
      {
        todo_id: uuid(),
        position: doing.length,
        status: contentStatus,
        category: ["Uncategorized"],
        text: faker.lorem.words(3),
        user_id: decodeToken.user_id,
        createdAt: dateTime,
      },
      contentStatus
    );
  };

  async function handleUpdateTodoText() {
    updateTodo(
      {
        todo_id: editing.todo_id,
        text: editing.text,
        user_id: decodeToken.user_id,
      },
      contentStatus
    );
    setEditing(initialEditingState); // reset state edit
  }

  async function handleRemoveTodo(todo: Todo) {
    removeTodo(
      {
        todo_id: todo.todo_id,
        user_id: decodeToken.user_id,
      },
      contentStatus
    );
  }

  function handleRemoveCategory(todo: Todo, categoryName: string) {
    const { todo_id, category } = todo;
    const filteredCategory = category.filter((item: string) => item !== categoryName);
    updateTodo(
      {
        todo_id,
        category: filteredCategory.length > 0 ? filteredCategory : ["Uncategorized"], // if custom category is not set, set default with "Uncategorized"
        user_id: decodeToken.user_id,
      },
      contentStatus
    );
  }

  return (
    <div className={`card w-full min-w-[20rem] shadow-xl bg-gray-700 rounded-md`}>
      <div className="card-body px-[1.5rem] py-[1rem] text-white">
        <h2 className="card-title">Doing</h2>
        <Droppable droppableId={contentStatus}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {doing &&
                doing.map((todo: Todo, index: number) => (
                  <Draggable key={todo.todo_id} draggableId={JSON.stringify(todo)} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={`card bg-base-100 shadow-xl rounded-md select-none`}>
                          <div className="card-body px-[1rem] py-[1rem] text-white">
                            <div onDrop={(ev) => dropCategory(ev, contentStatus)} onDragOver={allowDropCategory} id={todo.todo_id} className="card-title flex-nowrap overflow-y-auto pb-1" style={{ scrollbarWidth: "none" }}>
                              {todo.category &&
                                todo.category.map((item: any, index: any) => (
                                  <div key={index} onMouseEnter={() => setHoveredCategory(item)} onMouseLeave={() => setHoveredCategory("")} className={`${item === "Uncategorized" ? "badge-abu" : setColor(item)} flex items-center gap-x-1 !rounded select-none font-semibold`}>
                                    <span>{item}</span>
                                    {hoveredCategory === item && hoveredCategory !== "Uncategorized" && (
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3 cursor-pointer" onClick={() => handleRemoveCategory(todo, item)}>
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                      </svg>
                                    )}
                                  </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-12 gap-2">
                              <div className="col-span-11">
                                <div onClick={() => handleEditing(todo)}>{editing.isEdit && editing.todo_id === todo.todo_id ? <input type="text" onBlur={() => handleUpdateTodoText()} onChange={(e) => setEditing({ ...editing, text: e.target.value })} autoFocus placeholder="Type here" value={editing.text} className="input w-full" /> : <span className="text-wrap">{todo.text}</span>}</div>
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
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button className="btn btn-block bg-gray-700 text-white" onClick={handleCreateTodo}>
          <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <span>Add another todo</span>
        </button>
      </div>
    </div>
  );
}
