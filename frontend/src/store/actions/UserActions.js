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
  console.log(userid);
  return (dispatch) => {
    fetch(`http://localhost:4000/api/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((err) => alert(err));
  };
};

export const resetMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};

export const updateLoginCredentials = (user, token) => {
  const data = {
    message: "Loggedin successfully",
    token: "Bearer " + token,
    user: {
      id: user.id,
      name: user.name,
      email: "",
    },
  };
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      data,
    });
  };
};

export const loginWithGoogle = (token) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:4000/api/user/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    dispatch({
      type: "LOGIN",
      data,
    });
  };
};