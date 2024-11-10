import NavBarDropDownSubItem from "./NavBarDropDownSubItem";
import { useSelector } from "react-redux";

function NavBarDropDownItem({ parentCategory }) {
  const categories = useSelector((state) => state.categories.categories);

  let selectedCat =
    categories &&
    categories.map((item) => {
      return item.filter((cate) => parentCategory._id === cate.parentCategory);
    });

  return (
    <div className="dropdown">
      <div className="dropbtn">{parentCategory.name}</div>
      <div className="dropdown-content">
        {selectedCat &&
          selectedCat.map((category) => {
            return category.map((item) => {
              return (
                <NavBarDropDownSubItem
                  category={item}
                  key={item._id}
                  parentCat={parentCategory}
                />
              );
            });
          })}
      </div>
    </div>
  );
}

export default NavBarDropDownItem;
