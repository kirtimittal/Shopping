import React from "react";
import "../css/Wishlist.css";
import { IoMdClose } from "react-icons/io";
import { addToCart } from "../store/actions/CartActions";
import { connect } from "react-redux";
import { removeFromWishlist } from "../store/actions/WishlistActions";
import notify from "./Notify";

function Product({ data, addToCart, user, removeFromWishlist, token }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  const addProductToCart = () => {
    addToCart(data, user.id, token);
    removeFromWishlist(data._id, user.id, token);
    notify("Item added to Cart", "info");
  };
  const removeProductFromWishlist = () => {
    removeFromWishlist(data._id, user.id, token);
  };
  return (
    <div className="product-item wishlist-item">
      <div className="close-btn" onClick={removeProductFromWishlist}>
        <IoMdClose />
      </div>
      <img src={data.img_url} alt={data.name}></img>

      <h5 className="font-bold brand-text">{data.brand}</h5>
      <h6>{data.description}</h6>
      {/* {discountprice && ( */}
      <div className="price-cont">
        <h6 className="price-cont font-bold">
          Rs. {data.discountedPrice.$numberDecimal}
        </h6>
        <h6 className="strike-product price-cont">
          Rs. {data.actualPrice.$numberDecimal}
        </h6>
        <h6 className="discount-text price-cont">({data.discount} OFF) </h6>

        <div className="add-to-cart-cont" onClick={addProductToCart}>
          <h4>Move to Cart</h4>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, userid, token) =>
      dispatch(addToCart(product, userid, token)),
    removeFromWishlist: (productid, userid, token) =>
      dispatch(removeFromWishlist(productid, userid, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
