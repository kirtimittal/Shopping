import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { addOrder, resetMessage } from "../store/actions/OrderActions";
import notify from "./Notify";
import { emptyCart } from "../store/actions/CartActions";
import { useNavigate } from "react-router-dom";

function CartPrice() {
  const cart = useSelector((state) => state.cart.cart[0]);
  const order = useSelector((state) => state.order);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cart);
  const placeOrder = () => {
    const proditems = items.map((item) => {
      return {
        productid: item._id,
        name: item.name,
        qty: 1,
        price: item.discountedPrice.$numberDecimal,
      };
    });
    const address = {
      street: "delhi",
      city: "delhi",
      postalCode: "111111",
      country: "india",
    };
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

  useEffect(() => {
    if (order.message && order.message !== "") {
      notify(order.message, "success");
      dispatch(resetMessage());
      dispatch(emptyCart(user.user.id, user.token));
      navigate("/orderdetails");
    }
    if (order.error && order.error !== null) {
      notify(order.error, "error");
      dispatch(resetMessage());
    }
  }, [order.message, order.error]);

  return (
    cart && (
      <div className="price-item-cont">
        <div className="price-item">
          <h6>Total Amount (Inclusive of all taxes):</h6>
          <h6>Rs. {totalPrice}</h6>
        </div>
        <div className="price-item">
          <h6>Shipping Charges</h6>
          <h6>Rs 0.0</h6>
        </div>
        <hr></hr>
        <div className="price-item">
          <h6>
            <b>Total Amount Payable:</b>
          </h6>
          <h6>Rs. {totalPrice}</h6>
        </div>
        <div className="price-item">
          <Button
            variant="primary"
            type="submit"
            id="place-order-btn"
            className="order-btn"
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    )
  );
}

export default CartPrice;
