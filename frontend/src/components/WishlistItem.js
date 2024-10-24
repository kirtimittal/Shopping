import React, { useState } from "react";
import "../css/Wishlist.css";
import { IoMdClose } from "react-icons/io";
import { addToCart } from "../store/actions/CartActions";
import { connect } from "react-redux";
import { removeFromWishlist } from "../store/actions/WishlistActions";
import notify from "./Notify";
import { Modal, Button } from "react-bootstrap";
import Size from "./Size";

function Product({ data, addToCart, user, removeFromWishlist, token }) {
  // const discountprice =
  //   data.actualprice - data.actualprice * (data.discount / 100);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const setSize = (s) => {
    localStorage.setItem("Size", s.trim());
  };
  const showModal = () => {
    setShow(true);
  };
  const addProductToCart = () => {
    let size = localStorage.getItem("Size");
    let qty = 1;
    //localStorage.setItem("Size", "");
    if (size === "") {
      setShow(false);
      notify("Size not selected", "error");
    } else {
      addToCart(data, user.id, token, size, qty);
      removeFromWishlist(data._id, user.id, token);
      notify("Item added to Cart", "info");
      localStorage.setItem("Size", "");
    }
  };
  const removeProductFromWishlist = () => {
    removeFromWishlist(data._id, user.id, token);
  };
  return (
    <div className="product-item wishlist-item">
      <div className="item-cont">
        <div className="wishlist-item-img-cont">
          <img
            src={data.img_url}
            alt={data.name}
            className="wishlist-img"
          ></img>
          <div className="close-btn" onClick={removeProductFromWishlist}>
            <IoMdClose />
          </div>
        </div>

        <h5 className="font-bold brand-text">{data.brand}</h5>
        <h6>{data.name}</h6>
        {/* {discountprice && ( */}
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

      <hr></hr>
      <div className="add-to-cart-cont" onClick={showModal}>
        <h4>Move to Cart</h4>
      </div>
      {/* )} */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="size-cont">
            <Size
              data={data.sizeAvailable}
              key={data._id}
              itemid={data._id}
              //   sizeSelected={sizeSelected}
              onClickHandle={(size) => setSize(size)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProductToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
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
    addToCart: (product, userid, token, size, qty) =>
      dispatch(addToCart(product, userid, token, size, qty)),
    removeFromWishlist: (productid, userid, token) =>
      dispatch(removeFromWishlist(productid, userid, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
