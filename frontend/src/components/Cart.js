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
  const cart = useSelector((state) => state.cart.cart[0]);
  //const cartProducts = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  //const userid = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // var cartProducts = products.filter((product) =>
  //   cart.find((item) => item.productid === product._id)
  // );
  console.log(cart);
  const navigateToWishlist = () => {
    navigate("/wishlist");
  };
  useEffect(() => {
    if (user) {
      dispatch(getCartItems(user.id, token));
    }
  }, []);
  const loginClickHandle = () => {
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <>
          {cart && cart.length > 0 ? (
            <div className="cart-div">
              <div className="cart-cont">
                <h5>Shopping Cart: {totalItems} items</h5>
                {cart.map((product) => {
                  return (
                    <CartItem data={product.productid} key={product._id} />
                    // <div>
                    //   <img src={product.img_url} alt={product.name}></img>
                    // </div>
                  );
                })}
              </div>
              <div className="order-summ-cont">
                <h5>Order Summary:</h5>
                <div className="price-container">{cart && <CartPrice />}</div>
              </div>
            </div>
          ) : (
            <div className="wishlist-login-cont">
              <h4 className="label-msg">
                There is nothing in your bag. Let's add some items
              </h4>

              <Button variant="outline-primary" onClick={navigateToWishlist}>
                Add Items From Wishlist
              </Button>
            </div>
          )}
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
