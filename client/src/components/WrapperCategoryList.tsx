import { badgeButton } from "@/utils/category-color";

function WrapperCategoryList() {
  function dragCategory(ev: any) {
    ev.dataTransfer.setData("category", ev.target.getAttribute("data-category-name"));
  }

  return (
    <div className="mb-3 flex flex-wrap gap-3">
      {badgeButton.map((btn, index) => (
        <div draggable onDragStart={dragCategory} data-category-name={btn.name} key={index} className={`${btn.colorClass} !rounded select-none font-semibold`}>
          {btn.name}
        </div>
      ))}
    </div>
  );
}

export default WrapperCategoryList;
