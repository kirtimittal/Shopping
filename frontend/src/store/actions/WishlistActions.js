let BASE_URL = "http://localhost:4000";

export const addToWishlist = (productid, userid, token) => {
  console.log(productid + " " + userid);
  const wishlist = {
    productid,
    userid,
  };
  return (dispatch) => {
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
        console.log(status);
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
    fetch(`${BASE_URL}/api/wishlist/${userid}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((productid) => {
        console.log(productid);
        productid.forEach((id) => {
          fetch(`${BASE_URL}/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              dispatch({
                type: "ADD_TO_ITEMS",
                data,
              });
            });
        });
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
        console.log(data);
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
