import React from "react";
import { useSelector } from "react-redux";

function CartPrice() {
  const cart = useSelector((state) => state.cart.cart[0]);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  console.log(cart);
  return (
    cart && (
      <div>
        <h4>PRICE DETAILS({totalItems} item)</h4>
        <h4>Total Amount: {totalPrice}</h4>
      </div>
    )
  );
}

export default CartPrice;
