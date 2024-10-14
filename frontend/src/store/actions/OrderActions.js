//let BASE_URL="https://shopping-1-r5s0.onrender.com";
let BASE_URL = "http://localhost:4000";

export const addOrder = (
  userid,
  token,
  totalItems,
  totalPrice,
  proditems,
  address
) => {
  return async (dispatch) => {
    try {
      const order = {
        userid,
        items: proditems,
        totalItems,
        totalPrice,
        shippingAddress: address,
      };
      const res = await fetch(`${BASE_URL}/api/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      console.log(data);
      dispatch({
        type: "ADD_ORDER",
        data,
      });
      data.order.items.forEach((item) => {
        fetch(`${BASE_URL}/product/${item.productid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            dispatch({
              type: "ADD_ORDER_ITEMS",
              data,
            });
          })
          .catch((err) => alert(err));
      });
    } catch (err) {
      dispatch({
        type: "FAILURE",
        error: err.message,
      });
    }
  };
};

export const resetMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};

export const getOrders = (userid, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${userid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      data.items.forEach((item) => {
        fetch(`${BASE_URL}/product/${item.productid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            dispatch({
              type: "ADD_ORDER_ITEMS",
              data,
            });
          })
          .catch((err) => alert(err));
      });
      dispatch({
        type: "GET_ORDER",
        data,
      });
    } catch (err) {
      dispatch({
        type: "FAILURE",
        error: err.message,
      });
    }
  };
};
