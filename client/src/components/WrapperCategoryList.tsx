import { badgeButton } from "@/utils/category-color";
import { useTodoStore } from "@/utils/store";

function WrapperCategoryList() {
  const selectedTodo = useTodoStore((state) => state.setTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  function handleDragEnd(e: any) {
    e.preventDefault();
    if (selectedTodo.todo_id || selectedTodo.user_id) {
      // remove uncategorized
      const isUncategorized = selectedTodo.category?.some((item: any) => {
        return item === badgeButton[0].name;
      });
      if (isUncategorized) {
        selectedTodo.category = [];
      }

      // check exist category
      const isCategoryExist = selectedTodo.category?.some((item: any) => {
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

  function handleDragOverCategoryList(e: any) {
    e.preventDefault();
    selectedTodo.selectedCategoryTodo = e.target.innerText;
  }

  function handleDragLeaveCategoryList(e: any) {
    e.preventDefault();
    selectedTodo.todo_id = "";
    selectedTodo.category = [];
    selectedTodo.user_id = "";
  }

  return (
    <div className="mb-3 flex flex-wrap gap-3" onDragOver={handleDragOverCategoryList} onDragLeave={handleDragLeaveCategoryList}>
      {badgeButton.map((btn, index) => (
        <div key={index} className={`${btn.colorClass} !rounded cursor-grab select-none font-semibold`} draggable onDragEnd={handleDragEnd}>
          {btn.name}
        </div>
      ))}
    </div>
  );
}

export default WrapperCategoryList;
