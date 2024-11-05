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
  //console.log(orderedProd);
  const loginClickHandle = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (user.user) {
      dispatch(getOrders(user.user.id, user.token));
    }
  }, []);

  const handleOnKey = (e) => {
    console.log(e.key);
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
    console.log(status);
    dispatch(getOrderByStatus(status, user.user.id, user.token));
    localStorage.setItem("Status", "");
  };

  console.log(orders);
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
          orders.map(
            (order) => (
              <OrderCard
                //data={product}
                key={order._id}
                orderDetails={order}
              />
            )
            // order.items.map((item) => {
            //   //console.log(product);
            //   return (
            //     <OrderCard
            //       //data={product}
            //       key={item._id}
            //       orderDetails={order}
            //     />
            //   );
            // })
            //   return (
            //     <OrderCard data={order} key={order._id} orderDetails={order} />
            //   );
          )
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

// export default Order;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   InputGroup,
//   Dropdown,
//   Modal,
//   Pagination,
// } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { getOrders } from "../store/actions/OrderActions.js";

// const Order = ({ orders }) => {
//   const orderedProd = useSelector((state) => state.order.orderItems);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const ordersPerPage = 5;
//   console.log(orderedProd);

//   useEffect(() => {
//     if (user.user) {
//       dispatch(getOrders(user.user.id, user.token));
//     }
//   }, [user.user]);

//   // Filtered orders based on search and status filter
//   //   const filteredOrders = orderedProd
//   //     .filter(
//   //       (order) =>
//   //         order._id.includes(searchTerm) ||
//   //         order.order_date.includes(searchTerm) ||
//   //         order.status.toLowerCase().includes(searchTerm.toLowerCase())
//   //     )
//   //     .filter((order) => statusFilter === "" || order.status === statusFilter);

//   //   // Pagination logic
//   //   const indexOfLastOrder = currentPage * ordersPerPage;
//   //   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   //   const currentOrders = filteredOrders.slice(
//   //     indexOfFirstOrder,
//   //     indexOfLastOrder
//   //   );

//   const handleShowModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Container className="my-4">
//       <h2 className="mb-4">Your Orders</h2>

//       {/* Search and Filter Section */}
//       <InputGroup className="mb-3">
//         <Form.Control
//           placeholder="Search orders..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Dropdown onSelect={(e) => setStatusFilter(e)}>
//           <Dropdown.Toggle variant="secondary" id="dropdown-status">
//             {statusFilter === "" ? "Filter by Status" : statusFilter}
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item eventKey="">All</Dropdown.Item>
//             <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
//             <Dropdown.Item eventKey="Processing">Processing</Dropdown.Item>
//             <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </InputGroup>

//       {/* Orders Table */}
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Total Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderedProd &&
//             orderedProd.map((order, index) => (
//               <tr key={index}>
//                 <td>{order.id}</td>
//                 <td>{order.order_date}</td>
//                 <td>{order.status}</td>
//                 <td>${order.totalPrice.toFixed(2)}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleShowModal(order)}
//                   >
//                     View Details
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       {/* <Pagination>
//         {[...Array(Math.ceil(filteredOrders.length / ordersPerPage))].map(
//           (_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           )
//         )}
//       </Pagination> */}

//       {/* Order Details Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Order Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedOrder ? (
//             <>
//               <p>
//                 <strong>Order ID:</strong> {selectedOrder.id}
//               </p>
//               <p>
//                 <strong>Date:</strong> {selectedOrder.date}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedOrder.status}
//               </p>
//               <p>
//                 <strong>Total Amount:</strong> ${selectedOrder.total.toFixed(2)}
//               </p>
//               <p>
//                 <strong>Products:</strong>
//               </p>
//               <ul>
//                 {selectedOrder.products.map((product, index) => (
//                   <li key={index}>
//                     {product.name} (x{product.quantity}) - $
//                     {product.price.toFixed(2)}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <p>No order selected</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

export default Order;
