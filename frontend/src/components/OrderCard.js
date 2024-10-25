import React from "react";
import "../css/Cart.css";
import { IoMdClose } from "react-icons/io";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";

function OrderCard({ orderDetails }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  //   const orderedProd = useSelector((state) => state.order.items);

  //   let products = orderedProd.filter((prod) =>
  //     orderDetails.items.map((product) => prod._id === product.productid)
  //   );
  //   console.log(products);

  const renderStatus = (status) => {
    switch (status) {
      case "Processing":
        return <AiOutlineSync style={{ color: "green" }} />;
      case "Shipped":
        return <FaShippingFast style={{ color: "green" }} />;
      case "Delivered":
        return <FaCheckCircle style={{ color: "green" }} />;
      case "Cancelled":
        return <MdCancel style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <>
      {orderDetails.items &&
        orderDetails.items.map((data) => (
          <div className="order-detail-cont">
            <div className="status-cont-flex">
              <h4>{renderStatus(orderDetails.status)}</h4>
              <div>{orderDetails.status}</div>
            </div>

            <div>
              On {new Date(orderDetails.last_updated).toLocaleDateString()}
            </div>
            <Link
              to={`/order/${orderDetails._id}/product/${data.productid._id}`}
            >
              <div>
                <div className="product-item cart-item order-item">
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
                    <div>Qty: {data.qty}</div>
                    <div>Size: {data.size}</div>
                  </div>
                  <div className="arrow-order-item">
                    <h5>{">"}</h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      {!orderDetails.items && (
        <div>
          <h4>Orders Not found!!</h4>
        </div>
      )}
    </>
  );
}

export default OrderCard;
