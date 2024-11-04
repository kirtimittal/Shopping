import React, { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder, resetMessage } from "../store/actions/OrderActions";
import notify from "./Notify";
import { emptyCart } from "../store/actions/CartActions";
import CartPrice from "./CartPrice";
import "../css/Order.css";
import { ThreeDots } from "react-loader-spinner";

const ConfirmOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart[0]);
  const user = useSelector((state) => state.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalItems = useSelector((state) => state.cart.totalItems);
  //const items = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (order.message && order.message !== "") {
      //notify(order.message, "success");
      dispatch(resetMessage());
      dispatch(emptyCart(user.user.id, user.token));
      navigate("/thank-you");
    }
    if (order.error && order.error !== null) {
      notify(order.error, "error");

      dispatch(resetMessage());
      navigate("/cart");
    }
  }, [order.message, order.error]);
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAddress(JSON.parse(value));
    console.log(address);
  };
  console.log(address);
  const placeOrder = () => {
    if (address === null) {
      notify("Please select address", "error");
      return;
    }
    const proditems = cartItems.map((item) => {
      return {
        productid: item.productid._id,
        name: item.productid.name,
        qty: item.qty,
        price: item.productid.discountedPrice.$numberDecimal,
        size: item.size,
      };
    });
    dispatch(
      addOrder(
        user.user.id,
        user.token,
        totalItems,
        totalPrice,
        proditems,
        address
      )
    );
  };

  return (
    <div className="">
      {/* <h2 className="order-det-header">Order Details</h2> */}
      <br />
      <br />
      <br />

      <div className="order-flex-cont">
        <div className="shipping-addr-div">
          <h5>Select Delivery Address</h5>
          <br />
          {user.user &&
            user.user.address.map((shippingAddress, index) => {
              return (
                <div className="address-card">
                  <Card.Body>
                    <div className="address-flex">
                      <Form.Check
                        type="radio"
                        name="address"
                        value={JSON.stringify(shippingAddress)}
                        onChange={handleRadioChange}
                        label=""
                      ></Form.Check>
                      <div>
                        <p>{shippingAddress.street}</p>
                        <p>{shippingAddress.state}</p>
                        <p>
                          {shippingAddress.city}, {shippingAddress.postalCode}
                        </p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>
                  </Card.Body>
                </div>
              );
            })}
          {user.user && user.user.address.length === 0 && (
            <>
              {notify("Please update your address before proceeding", "info")}
              <div>No Address Found</div>
            </>
          )}
        </div>
        <div className="order-price-cont">
          <div>
            <h5>Order Summary:</h5>
            <div className="price-container">
              {cartItems && (
                <CartPrice onClickHandle={placeOrder} text={"Place Order"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
