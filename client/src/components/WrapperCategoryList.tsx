import { badgeButton } from "@/utils/category-color";
import axiosClient, { updateSyncTodoAPI } from "@/utils/api";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import type { Props as WrapperCategoryListProps } from "@/utils/types";
import { useTodoStore } from "@/utils/store";

function WrapperCategoryList({ jwtToken, decodeToken }: WrapperCategoryListProps) {
  const router = useRouter();
  const todos = useTodoStore((state: any) => state.todos);
  function dragCategory(ev: any) {
    ev.dataTransfer.setData("category", ev.target.getAttribute("data-category-name"));
  }

  function handleLogout() {
    axiosClient
      .put(
        "/api/user/logout",
        {
          username: decodeToken.username,
          user_id: decodeToken.user_id,
        },
        {
          headers: { Authorization: jwtToken },
        }
      )
      .then((result) => {
        if (result.data.status === "Logout") {
          destroyCookie(null, "token");
          router.replace("/");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function handleSave() {
    const combinedTodos = [...todos.todo, ...todos.doing, ...todos.done];
    updateSyncTodoAPI(combinedTodos, decodeToken.user_id);
  }

  return (
    <div className="mb-3 flex  justify-between gap-3">
      <div className="flex items-center flex-wrap gap-x-2 ">
        {badgeButton.map((btn, index) => (
          <div draggable onDragStart={dragCategory} data-category-name={btn.name} key={index} className={`${btn.colorClass} !rounded select-none font-semibold cursor-grab`}>
            {btn.name}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <button className="btn btn-sm btn-primary" onClick={handleSave}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="black" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6z" />
          </svg>
        </button>
        <button className="btn btn-error btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default WrapperCategoryList;
