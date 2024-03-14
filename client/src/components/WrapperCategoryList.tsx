import { badgeButton } from "@/utils/category-color";
import { useTodoStore } from "@/utils/store";

function WrapperCategoryList() {
  return (
    <div className="mb-3 flex flex-wrap gap-3">
      {badgeButton.map((btn, index) => (
        <div key={index} className={`${btn.colorClass} !rounded cursor-grab select-none font-semibold`}>
          {btn.name}
        </div>
      ))}
    </div>
  );
}

export default WrapperCategoryList;
