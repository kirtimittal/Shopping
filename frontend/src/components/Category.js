import React from "react";
import image1 from "../images/image1.jpg";
import "../css/Categories.css";

function Category({ data, parent }) {
  return (
    <div className="backcolor">
      <img src={data.img_URL} alt="image1" />
      <h4>{parent.name + " " + data.name}</h4>
      <h4>{data.discount}</h4>
    </div>
  );
}

export default Category;
