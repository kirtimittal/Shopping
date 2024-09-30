import React, { useEffect } from "react";
import { getWishlist } from "../store/actions/WishlistActions";
import { connect } from "react-redux";
import WishlistItem from "./WishlistItem";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Wishlist({ user, getWishlist, wishlist }) {
  const navigate = useNavigate();
  // if user is null then show msg please login
  // if logged in show wishlist by user Id
  // add item to Cart
  // remove item from wishist
  useEffect(() => {
    if (user) {
      getWishlist(user.id);
    }
  }, []);

  const loginClickHandle = () => {
    navigate("/login");
  };
  return (
    <div>
      {user ? (
        <div>
          {wishlist && (
            <>
              <h3>My Wishlist</h3>
              <div className="product-cont">
                {wishlist.map((item) => {
                  console.log(item);
                  return <WishlistItem key={item._id} data={item} />;
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="wishlist-login-cont">
          <h4>PLEASE LOG IN</h4>
          <h4 className="label-msg">Login to view items in your wishlist.</h4>
          <Button variant="outline-primary" onClick={loginClickHandle}>
            LOGIN
          </Button>
          {/* <button className="btn-login" onClick={loginClickHandle}>LOGIN</button> */}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    wishlist: state.wishlist.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: (userid) => dispatch(getWishlist(userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
