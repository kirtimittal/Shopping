import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/actions/ProductActions";
import { connect, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "../css/ProductDetail.css";
import Size from "./Size";
import { addToCart } from "../store/actions/CartActions";
import { addToWishlist } from "../store/actions/WishlistActions";

function ProductDetail({
  getProductById,
  selectedProduct,
  addToCart,
  user,
  addToWishlist,
  wishlist,
}) {
  const { parentCat, category, id } = useParams();
  const cart = useSelector((state) => state.cart.cart);
  const [sizeSelected, setsizeSelected] = useState("");

  const error = wishlist.error;
  // const sizes = [
  //   { id: 1, name: "S" },
  //   { id: 2, name: "M" },
  //   { id: 3, name: "L" },
  // ];
  //const [data, setData] = useState({});
  console.log(id, category);
  // const discountprice =
  //   selectedProduct.actualprice -
  //   selectedProduct.actualprice * (selectedProduct.discount / 100);

  useEffect(() => {
    getProductById(id);
  }, [id]);
  const checkFirstRender = useRef(true);

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
      return;
    }
    if (error) {
      alert(error.message);
    }
  }, [error]);

  const productAddToCart = () => {
    if (user === null) {
      alert("Login to add items to cart");
    } else {
      addToCart(selectedProduct, user.id);
      console.log(cart);
      alert("added");
    }
  };

  const productAddToWishlist = async () => {
    if (user === null) {
      alert("Login to add items to wishlist");
    } else {
      await addToWishlist(selectedProduct._id, user.id);
    }
  };

  return (
    <>
      {selectedProduct && (
        <div className="prod-cont">
          <img src={selectedProduct.img_url} alt={selectedProduct.name} />
          <div className="prod-detail-cont">
            <h2 className="font-bold brand-text">{selectedProduct.brand}</h2>
            <h3>{selectedProduct.description}</h3>
            {/* {discountprice && ( */}
            <div className="price-cont">
              <h4 className="price-cont font-bold">
                Rs. {selectedProduct.discountedPrice.$numberDecimal}
              </h4>
              <h4 className="strike-product price-cont">
                Rs. {selectedProduct.actualPrice.$numberDecimal}
              </h4>
              <h4 className="discount-text price-cont">
                ({selectedProduct.discount} OFF)
              </h4>
            </div>
            {/* )} */}
            <br />
            <br />
            <h4>Select Size</h4>
            <div className="size-cont">
              <Size
                data={selectedProduct.sizeAvailable}
                key={selectedProduct._id}
                itemid={selectedProduct._id}
                //   sizeSelected={sizeSelected}
                onClickHandle={(size) => setsizeSelected(size)}
              />
              {/* {sizes.map((item) => (
            
          ))} */}
            </div>

            <Button
              variant="primary"
              className="btn"
              onClick={productAddToCart}
            >
              Add to Cart
            </Button>

            <Button variant="primary" onClick={() => productAddToWishlist()}>
              Wishlist
            </Button>
          </div>
        </div>
      )}
      {/* {error && alert(error.message)} */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.products.selectedProduct,
    cart: state.cart,
    user: state.user.user,
    wishlist: state.wishlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductById: (id) => dispatch(getProductById(id)),
    addToCart: (product, userid) => dispatch(addToCart(product, userid)),
    addToWishlist: (productid, userid) =>
      dispatch(addToWishlist(productid, userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
