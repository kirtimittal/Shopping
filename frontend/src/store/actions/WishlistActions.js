//let BASE_URL = "http://localhost:4000";
let BASE_URL = "https://shoppingapi-3kd4.onrender.com";

export const addToWishlist = (productid, userid, token) => {
  const wishlist = {
    productid,
    userid,
  };
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(wishlist),
    })
      .then((response) => {
        return response
          .json()
          .then((data) => ({ data, status: response.status }));
      })
      .then(({ data, status }) => {
        if (status !== 200) {
          dispatch({
            type: "ERROR",
            data,
          });
        } else {
          dispatch({
            type: "ADD_TO_WISHLIST",
            data,
            message: "Item added to wishlist",
          });
        }
      })
      .catch((err) => alert(err));
  };
};

export const getWishlist = (userid, token) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/wishlist/${userid}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((productid) => {
        productid.forEach((id) => {
          fetch(`${BASE_URL}/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
              dispatch({
                type: "ADD_TO_ITEMS",
                data,
              });
            });
        });
        if (productid.length === 0) {
          dispatch({
            type: "ADD_TO_ITEMS",
            data: productid,
          });
        }
      })
      .catch((err) => alert(err));
  };
};

export const removeFromWishlist = (productid, userid, token) => {
  const obj = {
    productid,
    userid,
  };
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`${BASE_URL}/api/wishlist/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response
          .json()
          .then((data) => ({ data, status: response.status }));
      })
      .then(({ data, status }) => {
        if (status !== 200) {
          dispatch({
            type: "ERROR",
            data,
          });
        } else {
          dispatch({
            type: "REMOVE_FROM_WISHLIST",
            productid,
            userid,
          });
        }
      })
      .catch((err) => alert(err));
  };
};
