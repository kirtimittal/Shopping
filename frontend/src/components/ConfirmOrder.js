import React, { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder, resetMessage } from "../store/actions/OrderActions";
import notify from "./Notify";
import { emptyCart } from "../store/actions/CartActions";

const ConfirmOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart[0]);
  const user = useSelector((state) => state.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalItems = useSelector((state) => state.cart.totalItems);
  //const items = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (order.message && order.message !== "") {
      notify(order.message, "success");
      dispatch(resetMessage());
      dispatch(emptyCart(user.user.id, user.token));
      navigate("/orderdetails");
    }
    if (order.error && order.error !== null) {
      notify(order.error, "error");
      dispatch(resetMessage());
    }
  }, [order.message, order.error]);
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAddress(JSON.parse(value));
    console.log(address);
  };
  console.log(address);
  const placeOrder = () => {
    if (address === null) {
      notify("Please select address", "error");
      return;
    }
    const proditems = cartItems.map((item) => {
      return {
        productid: item.productid._id,
        name: item.productid.name,
        qty: item.qty,
        price: item.productid.discountedPrice.$numberDecimal,
        size: item.size,
      };
    });
    dispatch(
      addOrder(
        user.user.id,
        user.token,
        totalItems,
        totalPrice,
        proditems,
        address
      )
    );
  };

  return (
    <div className="container mt-4 confirm-order-cont">
      <h2 className="mb-4">Confirm Your Order</h2>

      <div className="row">
        {/* Order Summary */}
        <div className="col-md-12">
          <Card>
            <Card.Header>Order Summary</Card.Header>
            <ListGroup variant="flush">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <img
                        className="confirm-order-img"
                        src={item.productid.img_url}
                        alt={item.productid.name}
                      ></img>
                    </div>
                    <div>
                      <strong>{item.productid.name}</strong> <br />
                      Quantity: {item.qty} <br />
                      Size:{item.size}
                    </div>
                    <div>
                      $
                      {item.productid.discountedPrice.$numberDecimal * item.qty}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer>
              <h4>Total: ${totalPrice}</h4>
            </Card.Footer>
          </Card>
        </div>

        {/* Shipping and Payment Info */}
        <div className="col-md-12 address-cont">
          <Card className="mb-3">
            <Card.Header>Select Shipping Address</Card.Header>

            {user.user &&
              user.user.address.map((shippingAddress, index) => {
                return (
                  <div className="address-card">
                    <Card.Body>
                      <div className="address-flex">
                        <Form.Check
                          type="radio"
                          name="address"
                          value={JSON.stringify(shippingAddress)}
                          onChange={handleRadioChange}
                          label=""
                        ></Form.Check>
                        <div>
                          <p>{shippingAddress.street}</p>
                          <p>{shippingAddress.state}</p>
                          <p>
                            {shippingAddress.city}, {shippingAddress.postalCode}
                          </p>
                          <p>{shippingAddress.country}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                );
              })}
          </Card>

          {/* <Card>
            <Card.Header>Payment Method</Card.Header>
            <Card.Body>
              <p>Netbanking</p>
            </Card.Body>
          </Card> */}

          {/* Confirm and Go Back Buttons */}
          <div className="mt-4">
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={placeOrder}
            >
              Confirm Order
            </Button>
            {/* <Button
              variant="secondary"
              className="w-100"
              //onClick={goBack}
            >
              Go Back
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
