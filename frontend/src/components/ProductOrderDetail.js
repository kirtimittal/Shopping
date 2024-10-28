import { Container, Row, Col, Image, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import StarRatingSubmit from "./StarRatingSubmit";
import { getReview } from "../store/actions/ReviewActions";
import { FaShippingFast } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";

const ProductOrderDetails = () => {
  const { orderId, productId } = useParams();
  const orders = useSelector((state) => state.order.orderItems);
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review.review);
  const order = orders.filter((order) => order._id === orderId);
  const user = useSelector((state) => state.user);
  let product =
    order[0].items &&
    order[0].items.filter((item) => item.productid._id === productId)[0];

  useEffect(() => {
    dispatch(getReview(user.user.id, productId, user.token));
  }, [productId, user.user.id]);

  const renderStatus = (status) => {
    switch (status) {
      case "Processing":
        return <AiOutlineSync style={{ color: "white" }} />;
      case "Shipped":
        return <FaShippingFast style={{ color: "white" }} />;
      case "Delivered":
        return <FaCheckCircle style={{ color: "white" }} />;
      case "Cancelled":
        return <MdCancel style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="order-product-cont">
      <div className="prod-item-1">
        <Image src={product.productid.img_url} alt={product.name} fluid />
        <h5>{product.name}</h5>
        <h5>{product.productid.description}</h5>
        <h5>Size : {product.size}</h5>
        <h5>Qty : {product.qty}</h5>
        <div className="order-status-div">
          <div>{renderStatus(order[0].status)}</div>
          <div className="order-status-item-flex">
            <div>
              {"  "} {order[0].status}{" "}
            </div>
            <div>On {new Date(order[0].last_updated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="review-item-2">
        {review && (
          <div>
            <h5>Your Rating:</h5>
            <h5>
              <Rating value={review.rating} text="" />
            </h5>
          </div>
        )}
        {!review && (
          <StarRatingSubmit productId={productId} status={order[0].status} />
        )}
      </div>

      <div className="address-item-3">
        <h5>Delivery Address</h5>
        <p>{order[0].shippingAddress.street}</p>
        <p>
          {order[0].shippingAddress.city}, {order[0].shippingAddress.postalCode}
        </p>
        <p>{order[0].shippingAddress.country}</p>
      </div>
      <div className="price-item-4">
        <h5>Total Order Price: </h5>
        <div>Rs. {product.price}</div>
      </div>
      <div className="order-id-item-5">ORDER ID: {order[0]._id}</div>
    </div>
    // <Container>
    //   <Row>
    //     <Col md={6}>
    //       <Image src={product.productid.img_url} alt={product.name} fluid />
    //     </Col>
    //     <Col md={6}>
    //       <h2>{product.name}</h2>
    //       <p>Price: ${product.price}</p>
    //       <p>Quantity: {product.qty}</p>
    //       <p>Total: ${product.qty * product.price}</p>
    //     </Col>
    //   </Row>
    //   <Row>
    //     {review && (
    //       <div>
    //         <h5>
    //           Your Rating:
    //           <Rating value={review.rating} text="" />
    //         </h5>
    //       </div>
    //     )}
    //     {!review && <StarRatingSubmit productId={productId} />}
    //   </Row>
    // </Container>
  );
};

export default ProductOrderDetails;
