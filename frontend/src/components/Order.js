import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/OrderCard.js";
import { getOrders } from "../store/actions/OrderActions.js";

function Order() {
  const orders = useSelector((state) => state.order.orderItems);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(orders);
  useEffect(() => {
    if (user.user) {
      dispatch(getOrders(user.user.id, user.token));
    }
  }, [user.user]);
  return (
    <div>
      {orders &&
        orders.map((order) => {
          return <OrderCard data={order} key={order._id} />;
        })}
    </div>
  );
}

export default Order;
