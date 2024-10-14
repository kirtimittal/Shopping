import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getCartItems } from "../store/actions/CartActions";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import CartPrice from "./CartPrice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Cart({ user, token }) {
  const cart = useSelector((state) => state.cart.cart);
  const cartProducts = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  //const userid = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // var cartProducts = products.filter((product) =>
  //   cart.find((item) => item.productid === product._id)
  // );
  useEffect(() => {
    if (user) {
      dispatch(getCartItems(user.id, token));
    }
  }, [user]);
  const loginClickHandle = () => {
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <>
          <div className="cart-div">
            <div className="cart-cont">
              <h5>Shopping Cart: {totalItems} items</h5>
              {cartProducts &&
                cartProducts.map((product) => {
                  return (
                    <CartItem data={product} key={product._id} />
                    // <div>
                    //   <img src={product.img_url} alt={product.name}></img>
                    // </div>
                  );
                })}
            </div>
            <div className="order-summ-cont">
              <h5>Order Summary:</h5>
              <div className="price-container">
                {cartProducts && <CartPrice />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="wishlist-login-cont">
          <h4>PLEASE LOG IN</h4>
          <h4 className="label-msg">Login to view items in your cart.</h4>

          <Button variant="outline-primary" onClick={loginClickHandle}>
            LOGIN
          </Button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(Cart);
