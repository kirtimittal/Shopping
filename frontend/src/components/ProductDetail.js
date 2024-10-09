import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/actions/ProductActions";
import { connect, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "../css/ProductDetail.css";
import Size from "./Size";
import { addToCart } from "../store/actions/CartActions";
import { addToWishlist } from "../store/actions/WishlistActions";
import styled from "styled-components";
import notify from "./Notify";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 50px;
  border: 1px solid #00adb7;
  border-radius: 15px;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

const Image = styled.img.attrs((props) => ({
  src: props.source,
}))``;

const Target = styled(Image)`
  position: absolute;
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
`;

function ProductDetail({
  getProductById,
  selectedProduct,
  addToCart,
  user,
  addToWishlist,
  wishlist,
  token,
}) {
  const { parentCat, category, id } = useParams();
  const cart = useSelector((state) => state.cart.cart);
  const cartMessage = useSelector((state) => state.cart.message);
  const [sizeSelected, setsizeSelected] = useState("");

  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e) => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

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
      notify(error.message, "error");
    }
    if (wishlist.message) {
      notify(wishlist.message, "info");
    }
    if (cartMessage) {
      notify(cartMessage, "info");
    }
  }, [error, wishlist.message, cartMessage]);

  const productAddToCart = () => {
    if (user === null) {
      alert("Login to add items to cart");
    } else {
      addToCart(selectedProduct, user.id, token);
      console.log(cart);
      //notify("Item added to cart", "info");
    }
  };

  const productAddToWishlist = async () => {
    if (user === null) {
      alert("Login to add items to wishlist");
    } else {
      await addToWishlist(selectedProduct._id, user.id, token);
      //notify("Item added to wishlist", "info");
    }
  };

  return (
    <>
      {selectedProduct && (
        <div className="prod-cont">
          <div>
            <Container
              ref={containerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <Image
                ref={sourceRef}
                alt="source"
                source={selectedProduct.img_url}
              />
              <Target
                ref={targetRef}
                alt="target"
                opacity={opacity}
                offset={offset}
                source={selectedProduct.img_url}
              />
            </Container>

            {/* <img src={selectedProduct.img_url} alt={selectedProduct.name} /> */}
          </div>

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
    token: state.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductById: (id) => dispatch(getProductById(id)),
    addToCart: (product, userid, token) =>
      dispatch(addToCart(product, userid, token)),
    addToWishlist: (productid, userid, token) =>
      dispatch(addToWishlist(productid, userid, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
