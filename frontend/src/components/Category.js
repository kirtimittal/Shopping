import React from "react";
import image1 from "../images/image1.jpg";
import "../css/Categories.css";

function Category({ data, parent }) {
  return (
    <div className="backcolor">
      <img src={data.img_URL} alt="image1" />
      <div className="category-caption">
        <h4>{parent.name + " " + data.name}</h4>
        <h4>{data.discount}</h4>
        <h4>Shop Now</h4>
      </div>
    </div>
  );
}

export default Category;
