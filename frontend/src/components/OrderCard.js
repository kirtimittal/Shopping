import React from "react";
import "../css/Cart.css";
import { IoMdClose } from "react-icons/io";
import { connect, useDispatch } from "react-redux";

function OrderCard({ data }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  const dispatch = useDispatch();

  return (
    <div className="product-item wishlist-item cart-item">
      {/* onClick={removeProductFromCart} */}

      <div className="img_cont">
        <img src={data.img_url} alt={data.name}></img>
      </div>
      <div className="details-cont">
        <h5 className="font-bold brand-text">{data.brand}</h5>
        <h6>{data.description}</h6>
        {/* {discountprice && ( */}
        <h5>
          <b>Qty: 1</b>
        </h5>
        <div className="price-cont">
          <h6 className="price-cont font-bold">
            Rs. {data.discountedPrice.$numberDecimal}
          </h6>
          <h6 className="strike-product price-cont">
            Rs. {data.actualPrice.$numberDecimal}
          </h6>
          <h6 className="discount-text price-cont">({data.discount} OFF) </h6>
        </div>
      </div>
      {/* <div className="close" onClick={removeProductFromCart}>
        <IoMdClose />
      </div> */}
      {/* )} */}
    </div>
  );
}

export default OrderCard;
