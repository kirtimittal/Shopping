import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar.js";
import { connect, useDispatch } from "react-redux";
import { checkLogin, resetMessage } from "../store/actions/UserActions.js";
import Signup from "./Signup.js";
import { ThreeDots } from "react-loader-spinner";

import { toast } from "react-toastify";

const notify = (message, type) => {
  toast(message, {
    type: type,
    autoClose: 3000, // Close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

function Login({ checkLogin, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  // const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., API call to authenticate
    authUser(username, password);
    console.log("Form submitted:", { username, password });
  };

  const authUser = (username, password) => {
    checkLogin(username, password);
    // if (user.user && !user.loading) {
    //   console.log("login");
    //   setIsAuth(true);
    //   notify(user.message, "success");
    // } else if (!user.user && !user.loading && user.message) {
    //   console.log("not login");
    //   notify(user.message, "error");
    // }
  };
  const handleNavigate = () => {
    const props = { isAuth, username: user.user.name }; // Props to pass
    navigate("/", { state: props });
  };

  // const handleSignup = (e) => {
  //   navigate("/signup");
  // };
  //   useEffect(() => {
  //     authUser(username, password);
  //   }, [username, password]);

  // if (user.error) {
  //   notify(user.error, "error");
  // }

  useEffect(() => {
    //success but unauthorized
    if (!user.user && !user.loading && user.message !== "") {
      notify(user.message, "error");
      dispatch(resetMessage());
    }
    //success
    if (user.user && !user.loading && user.message !== "") {
      notify(user.message, "success");
      handleNavigate();
      dispatch(resetMessage());
    }
    //error
    if (!user.user && !user.loading && user.error !== null) {
      notify(user.error, "error");
      dispatch(resetMessage());
    }
  }, [user.error, user.message]);

  if (user.loading) {
    return (
      <div>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: "500px" }}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <h4 id="login-label">Login or Signup</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter username"
                />
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </Form.Group>
              <br />
              <br />
              <Button variant="primary" id="login-btn" type="submit">
                Login
              </Button>
              <div id="signup-label">
                Don't have an account? <a href="/signup">Register</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* {user.loading && return (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )} */}

      {/* {isAuth && (
        <div>
          {alert("login  succcess")}
          {handleNavigate()}
        </div>
      )} */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (email, password) => dispatch(checkLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
