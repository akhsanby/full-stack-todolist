import { useTodoStore } from "@/utils/store";

const { updateTodo } = useTodoStore.getState();

export function dropCategory(ev: any, contentStatus: string) {
  ev.preventDefault();
  // check format data is "category"
  if (ev.dataTransfer.types.includes("category")) {
    const categoryName = ev.dataTransfer.getData("category");
    const todo_id = ev.currentTarget.id;
    const currentCategories = Array.from(ev.currentTarget.children)
      .map((elem: any) => elem.innerText)
      .filter((category) => category !== "Uncategorized") // remove "Uncategorized"
      .filter((category) => category !== categoryName); // remove same category name
    updateTodo(
      {
        todo_id,
        category: [...currentCategories, categoryName],
      },
      contentStatus
    );
  }
}

export function allowDropCategory(ev: any) {
  if (ev.dataTransfer.types.includes("category")) {
    ev.preventDefault();
  }
}
