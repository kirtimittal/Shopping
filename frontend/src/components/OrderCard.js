import React from "react";
import "../css/Cart.css";
import { IoMdClose } from "react-icons/io";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderCard({ orderDetails }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  //   const orderedProd = useSelector((state) => state.order.items);

  //   let products = orderedProd.filter((prod) =>
  //     orderDetails.items.map((product) => prod._id === product.productid)
  //   );
  //   console.log(products);
  return (
    <div>
      {orderDetails.items &&
        orderDetails.items.map((data) => (
          <Link to={`/order/${orderDetails._id}/product/${data.productid._id}`}>
            <div>
              <div>{orderDetails.status}</div>
              <div>{orderDetails.order_date}</div>
              <div className="product-item wishlist-item cart-item">
                {/* onClick={removeProductFromCart} */}

                <div className="img_cont">
                  <img
                    src={data.productid.img_url}
                    alt={data.productid.name}
                  ></img>
                </div>
                <div className="details-cont">
                  <h5 className="font-bold brand-text">
                    {data.productid.brand}
                  </h5>
                  <h6>{data.productid.description}</h6>
                  {/* {discountprice && ( */}
                  <h5>
                    <b>Qty: 1</b>
                  </h5>
                  {/* <div className="price-cont">
          <h6 className="price-cont font-bold">
            Rs. {data.discountedPrice.$numberDecimal}
          </h6>
          <h6 className="strike-product price-cont">
            Rs. {data.actualPrice.$numberDecimal}
          </h6>
          <h6 className="discount-text price-cont">({data.discount} OFF) </h6>
        </div> */}
                </div>
                {/* <div className="close" onClick={removeProductFromCart}>
        <IoMdClose />
      </div> */}
                {/* )} */}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default OrderCard;
