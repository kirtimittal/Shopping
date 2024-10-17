import React from "react";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const order = useSelector((state) => state.order.orderDetails);
  //const orderedProd = useSelector((state) => state.order.items);
  return (
    <Container className="my-4">
      {/* Order Summary */}
      <Card>
        <Card.Header as="h5">Order Summary</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Order Date:</strong> {order.order_date}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Shipping Address:</strong>
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Product Details */}
      <Card className="mt-3">
        <Card.Header as="h5">Products</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items &&
                order.items.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.productid.name}</td>
                    <td>{product.qty ?? 1}</td>
                    <td>${product.price}</td>
                    <td>${product.price * product.qty}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Tracking Info */}
      <Card className="mt-3">
        <Card.Header as="h5">Tracking Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              {/* <p>
                <strong>Carrier:</strong> {order.tracking.carrier}
              </p> */}
              <p>
                <strong>Tracking Number:</strong> {order.tracking_no}
              </p>
              {/* <Button variant="primary" href={order.tracking.link}>
                Track Your Order
              </Button> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderDetails;
