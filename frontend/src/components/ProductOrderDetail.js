import { Container, Row, Col, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductOrderDetails = () => {
  const { orderId, productId } = useParams();
  const orders = useSelector((state) => state.order.orderItems);

  const order = orders.filter((order) => order._id === orderId);
  let product =
    order[0].items &&
    order[0].items.filter((item) => item.productid._id === productId)[0];
  //   useEffect(() => {

  //   }, [orderId, productId]);

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
    </Container>
  );
};

export default ProductOrderDetails;
