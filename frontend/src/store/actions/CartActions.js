//let BASE_URL="https://shopping-1-r5s0.onrender.com";
//let BASE_URL = "http://localhost:4000";
let BASE_URL = "https://shoppingapi-3kd4.onrender.com";

export const addToCart = (product, userid, token, size, qty) => {
  const obj = {
    productid: product._id,
    userid: userid,
    qty,
    size,
  };
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "ADD_TO_CART",
          cart: data.cart[0],
          message: "Added to Cart",
        });
      })
      .catch((err) => alert(err));
  };
};

export const getCartItems = (userid, token) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/cart/getItems/${userid}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //data.cart.forEach((item) => {
        // data.cart[0].items.forEach((product) => {
        //   fetch(`${BASE_URL}/product/${product.productid}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       dispatch({
        //         type: "ADD_ITEMS",
        //         data,
        //       });
        //     })
        //     .catch((err) => alert(err));
        // });
        // });

        dispatch({
          type: "ADD_TO_CART",
          cart: data.cart[0],
        });
      })
      .catch((err) => alert(err));
  };
};

export const removeFromCart = (productid, userid, token) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/cart/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ productid, userid }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.cart.items.length === 0) {
        //   dispatch({
        //     type: "REMOVE_ITEMS",
        //     productid: "",
        //   });
        // } else {
        //   //   data.cart.items.forEach((product) => {
        //   //     fetch(`http://localhost:4000/product/${product.productid}`)
        //   //       .then((response) => response.json())
        //   //       .then((data) => {
        //   //         console.log(data);
        //   //         dispatch({
        //   //           type: "REMOVE_ITEMS",
        //   //           data,
        //   //         });
        //   //       });
        //   //   });
        //   // }
        //   dispatch({
        //     type: "REMOVE_ITEMS",
        //     productid,
        //   });
        // }
        dispatch({
          type: "REMOVE_FROM_CART",
          cart: data.cart[0],
        });
      })
      .catch((err) => alert(err));
  };
};
export const emptyCart = (userid, token) => {
  const obj = {
    userid,
  };
  return (dispatch) => {
    fetch(`${BASE_URL}/api/cart/empty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "RESET_CART",
          cart: data.cart,
        });
      })
      .catch((err) => alert(err));
  };
};
