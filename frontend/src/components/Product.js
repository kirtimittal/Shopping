import React from "react";
import "../css/Products.css";

function Product({ data }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  return (
    <div className="product-item">
      <img src={data.img_url} alt={data.name}></img>

      <h5 className="font-bold brand-text">{data.brand}</h5>
      <h6>{data.description}</h6>
      {/* {discountprice && ( */}
      <div className="price-cont">
        <h6 className="price-cont font-bold">
          Rs. {data.discountedPrice.$numberDecimal}
        </h6>
        <h6 className="strike-product price-cont">
          Rs. {data.actualPrice.$numberDecimal}
        </h6>
        <h6 className="discount-text price-cont">({data.discount} OFF) </h6>
      </div>
      {/* )} */}
    </div>
  );
}

export default Product;