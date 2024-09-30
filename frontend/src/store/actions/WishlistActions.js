export const addToWishlist = (productid, userid) => {
  console.log(productid + " " + userid);
  const wishlist = {
    productid,
    userid,
  };
  return (dispatch) => {
    fetch(`http://localhost:4000/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        if (status === 409) {
          dispatch({
            type: "ERROR",
            data,
          });
        } else {
          dispatch({
            type: "ADD_TO_WISHLIST",
            data,
          });
        }
      })
      .catch((err) => alert(err));
  };
};

export const getWishlist = (userid) => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/wishlist/${userid}`)
      .then((response) => response.json())
      .then((productid) => {
        console.log(productid);
        productid.forEach((id) => {
          fetch(`http://localhost:4000/product/${id}`)
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

export const removeFromWishlist = (productid, userid) => {
  const obj = {
    productid,
    userid,
  };
  return (dispatch) => {
    fetch(`http://localhost:4000/api/wishlist/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "REMOVE_FROM_WISHLIST",
          productid,
          userid,
        });
      })
      .catch((err) => alert(err));
  };
};
