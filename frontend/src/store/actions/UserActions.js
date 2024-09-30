export const checkLogin = (email, password) => {
  const user = {
    email,
    password,
  };
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    fetch(`http://localhost:4000/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response
          .json()
          .then((data) => ({ data, status: response.status }));
      })
      .then(({ data, status }) => {
        console.log(data);
        // if (status !== 200) {
        //   dispatch({
        //     type: "Failure",
        //     error: data.message,
        //   });
        // } else {
        dispatch({
          type: "LOGIN",
          data,
        });
        //}
      })
      .catch((err) =>
        dispatch({
          type: "FAILURE",
          error: err.message,
        })
      );
  };
};

export const signup = (formdata) => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        dispatch({
          type: "SIGNUP",
          data,
        });
      })
      .catch((err) => alert(err));
  };
};

export const logout = (userid) => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const resetMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};
