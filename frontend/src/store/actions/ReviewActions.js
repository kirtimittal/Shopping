let BASE_URL = "http://localhost:4000";

export const addReview = (name, rating, userid, comment, productid, token) => {
  const obj = { name, rating, userid, comment, productid };
  console.log("obj" + obj);
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      console.log(data);
      dispatch({
        type: "ADD_REVIEW",
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

export const getReview = (userid, productid, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/reviews/${productid}/${userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch({
        type: "GET_REVIEW",
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

export const resetMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};
