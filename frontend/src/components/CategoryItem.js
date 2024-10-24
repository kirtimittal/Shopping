import React from "react";
import "../css/Products.css";

function CategoryItem({ data, onCloseClick }) {
  return (
    <div className="brand-item-cont">
      <div>{data}</div>
      <div
        className="close-brand-btn"
        onClick={() => onCloseClick(data, false)}
      >
        X
      </div>
    </div>
  );
}

export default CategoryItem;
