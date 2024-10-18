import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/OrderCard.js";
import { getOrders } from "../store/actions/OrderActions.js";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function Order() {
  const orders = useSelector((state) => state.order.orderItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //console.log(orderedProd);
  const loginClickHandle = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (user.user) {
      dispatch(getOrders(user.user.id, user.token));
    }
  }, []);
  console.log(orders);
  return (
    <div>
      <h4>All Orders</h4>
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
