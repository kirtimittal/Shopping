import React from "react";
import Category from "./Category";
import "../css/Categories.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const parentCategory = useSelector(
    (state) => state.categories.parentCategory
  );
  console.log(categories);

  return (
    <div className="category-cont">
      {categories &&
        categories.map((cat) =>
          cat.map((item) => {
            let parent = parentCategory.filter(
              (category) => category._id === item.parentCategory
            );

            return (
              <Link
                to={`/${parent[0].name.toLowerCase()}/${item.name.toLowerCase()}`}
                key={item._id}
              >
                <Category data={item} key={item._id} parent={parent[0]} />
              </Link>
            );
          })
        )}
    </div>
  );
}

export default Categories;
