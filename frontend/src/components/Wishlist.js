import React, { useEffect } from "react";
import { getWishlist } from "../store/actions/WishlistActions";
import { connect } from "react-redux";
import WishlistItem from "./WishlistItem";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";

function Wishlist({ user, getWishlist, wishlist, token, loading }) {
  const navigate = useNavigate();
  // if user is null then show msg please login
  // if logged in show wishlist by user Id
  // add item to Cart
  // remove item from wishist
  useEffect(() => {
    if (user) {
      getWishlist(user.id, token);
    }
  }, [user]);

  const loginClickHandle = () => {
    navigate("/login");
  };
  return (
    <div>
      {user ? (
        <div>
          {loading && (
            <div className="spinner-cont">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader-spinner"
              />
            </div>
          )}
          {wishlist && wishlist.length > 0 && (
            <>
              <h3 className="wishlist-header">My Wishlist</h3>
              <div className="product-cont wishlist-cont">
                {wishlist.map((item) => {
                  console.log(item);
                  return <WishlistItem key={item._id} data={item} />;
                })}
              </div>
            </>
          )}
          {wishlist.length === 0 && (
            <div className="wishlist-login-cont">
              <h4 className="label-msg">Nothing is added in your wishlist.</h4>
            </div>
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
    token: state.user.token,
    loading: state.wishlist.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: (userid, token) => dispatch(getWishlist(userid, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
