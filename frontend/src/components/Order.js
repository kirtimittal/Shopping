import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/OrderCard.js";
import { getOrders, getOrderByStatus } from "../store/actions/OrderActions.js";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { searchOrder } from "../store/actions/OrderActions.js";
import { Modal, Form } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";

function Order() {
  const orders = useSelector((state) => state.order.orderItems);
  const loading = useSelector((state) => state.order.loading);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let status = ["Processing", "Shipped", "Delivered", "Cancelled"];
  const showModal = () => {
    setShow(true);
  };

  const loginClickHandle = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (user.user) {
      dispatch(getOrders(user.user.id, user.token));
    }
  }, []);

  const handleOnKey = (e) => {
    if (e.key === "Enter") {
      //console.log(searchInput);
      dispatch(searchOrder(searchInput, user.user.id, user.token));
      setSearchInput("");
    } else {
      //setSearchInput(e.target.value);
    }
  };
  const setStatus = (s) => {
    localStorage.setItem("Status", s.trim());
  };
  const filterOrderByStatus = () => {
    setShow(false);
    let status = localStorage.getItem("Status");
    dispatch(getOrderByStatus(status, user.user.id, user.token));
    localStorage.setItem("Status", "");
  };

  return (
    <div className="allorder-cont">
      <div className="order-filter-cont">
        <h4>All Orders</h4>
        <div className="input-group mb-3 order-search-width">
          <CiSearch className="search-img" />
          <input
            type="text"
            className="form-control search-input"
            name="search"
            id="search"
            placeholder="Search for orders"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleOnKey}
          />
        </div>

        <div className="order-filter-btn" onClick={showModal}>
          <BsFilter />
          <h5>FILTER</h5>
        </div>
      </div>
      <div>
        {loading && (
          <div className="spinner-cont">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="loader-spinner"
            />
          </div>
        )}
      </div>
      <div className="bg-div">
        {user.user ? (
          orders &&
          orders.map((order) => (
            <OrderCard
              //data={product}
              key={order._id}
              orderDetails={order}
            />
          ))
        ) : (
          <div className="wishlist-login-cont">
            <h4>PLEASE LOG IN</h4>
            <h4 className="label-msg">Login to see Orders.</h4>
            <Button variant="outline-primary" onClick={loginClickHandle}>
              LOGIN
            </Button>
            {/* <button className="btn-login" onClick={loginClickHandle}>LOGIN</button> */}
          </div>
        )}

        {user.user && orders && orders.length === 0 && (
          <div>
            <h4>Orders Not found!!</h4>
          </div>
        )}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="radio-status-cont">
            <Form>
              {status &&
                status.map((st) => (
                  <Form.Check
                    type="radio"
                    label={st}
                    name="radioGroup"
                    value={st}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                ))}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={filterOrderByStatus}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Order;
