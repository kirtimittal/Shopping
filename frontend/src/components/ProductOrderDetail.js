import { Container, Row, Col, Image, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import StarRatingSubmit from "./StarRatingSubmit";
import { getReview } from "../store/actions/ReviewActions";

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

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image src={product.productid.img_url} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.qty}</p>
          <p>Total: ${product.qty * product.price}</p>
        </Col>
      </Row>
      <Row>
        {review && (
          <div>
            <h5>
              Your Rating:
              <Rating value={review.rating} text="" />
            </h5>
          </div>
        )}
        {!review && <StarRatingSubmit productId={productId} />}
      </Row>
    </Container>
  );
};

export default ProductOrderDetails;
