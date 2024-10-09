import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function CartPrice() {
  const cart = useSelector((state) => state.cart.cart[0]);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  console.log(cart);
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
          >
            Place Order
          </Button>
        </div>
      </div>
    )
  );
}

export default CartPrice;
