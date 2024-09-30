export const addToCart = (product, userid) => {
  console.log(userid);
  const obj = {
    productid: product._id,
    userid: userid,
    qty: 1,
  };
  return (dispatch) => {
    fetch(`http://localhost:4000/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "ADD_TO_CART",
          cart: data.cart,
        });
      })
      .catch((err) => alert(err));
  };
};

export const getCartItems = (userid) => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/cart/getItems/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        //data.cart.forEach((item) => {
        data.cart[0].items.forEach((product) => {
          fetch(`http://localhost:4000/product/${product.productid}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              dispatch({
                type: "ADD_ITEMS",
                data,
              });
            })
            .catch((err) => alert(err));
        });
        // });

        dispatch({
          type: "ADD_TO_CART",
          cart: data.cart[0],
        });
      })
      .catch((err) => alert(err));
  };
};

export const removeFromCart = (productid, userid) => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/cart/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productid, userid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.cart.items.length === 0) {
          dispatch({
            type: "REMOVE_ITEMS",
            productid: "",
          });
        } else {
          //   data.cart.items.forEach((product) => {
          //     fetch(`http://localhost:4000/product/${product.productid}`)
          //       .then((response) => response.json())
          //       .then((data) => {
          //         console.log(data);
          //         dispatch({
          //           type: "REMOVE_ITEMS",
          //           data,
          //         });
          //       });
          //   });
          // }
          dispatch({
            type: "REMOVE_ITEMS",
            productid,
          });
        }
        dispatch({
          type: "REMOVE_FROM_CART",
          cart: data.cart,
        });
      })
      .catch((err) => alert(err));
  };
};
