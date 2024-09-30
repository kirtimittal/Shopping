import React from "react";
import "../css/Cart.css";
import { IoMdClose } from "react-icons/io";
import { addToCart } from "../store/actions/CartActions";
import { connect, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/actions/WishlistActions";
import { removeFromCart } from "../store/actions/CartActions";

function CartItem({ data, addToCart, user, removeFromWishlist }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);
  const dispatch = useDispatch();
  const removeProductFromCart = () => {
    dispatch(removeFromCart(data._id, user.id));
  };
  return (
    <div className="product-item wishlist-item cart-item">
      {/* onClick={removeProductFromCart} */}
      <div className="close" onClick={removeProductFromCart}>
        <IoMdClose />
      </div>
      <div className="img_cont">
        <img src={data.img_url} alt={data.name}></img>
      </div>
      <div className="details-cont">
        <h5 className="font-bold brand-text">{data.brand}</h5>
        <h6>{data.description}</h6>
        {/* {discountprice && ( */}
        <h5>
          <b>Qty: 1</b>
        </h5>
        <div className="price-cont">
          <h6 className="price-cont font-bold">
            Rs. {data.discountedPrice.$numberDecimal}
          </h6>
          <h6 className="strike-product price-cont">
            Rs. {data.actualPrice.$numberDecimal}
          </h6>
          <h6 className="discount-text price-cont">({data.discount} OFF) </h6>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromWishlist: (productid, userid) =>
      dispatch(removeFromWishlist(productid, userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
