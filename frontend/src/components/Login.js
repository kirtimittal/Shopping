import React, { useEffect, useState, useCallback } from "react";
import { Form, Button, Container, Row, Col, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar.js";
import { connect, useDispatch } from "react-redux";
import {
  checkLogin,
  resetMessage,
  updateLoginCredentials,
} from "../store/actions/UserActions.js";
import Signup from "./Signup.js";
import { ThreeDots } from "react-loader-spinner";
import Example from "./Notificationex.js";
import notify from "./Notify.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginWithGoogle } from "../store/actions/UserActions.js";
import "../css/App.css";
import { FaUser, FaLock } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";

function Login({ checkLogin, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., API call to authenticate
    authUser(username, password);
  };

  const authUser = (username, password) => {
    checkLogin(username, password);
  };
  const handleNavigate = () => {
    const props = { isAuth, username: user.user.name }; // Props to pass
    navigate(-1);
  };

  const handleSuccess = (response) => {
    const token = response.credential;
    dispatch(loginWithGoogle(token));
  };

  const handleError = () => {
    notify("Login Failed", "error");
  };

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
      <div className="spinner-cont">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="loader-spinner"
        />
      </div>
    );
  }

  return (
    <div className="login-div">
      <Container className="login-cont">
        <Row className="justify-content-md-center">
          <Col md={12}>
            <h4 id="login-label">Login</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    required="true"
                  />
                </InputGroup>
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    required="true"
                  />
                </InputGroup>
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
          <div className="divider">
            <div>
              <b>OR</b>
            </div>
          </div>
          <div className="google-login-cont">
            <GoogleOAuthProvider clientId="229313699502-aagqig7sm0efn74vle83nub6r7oeo3it.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </GoogleOAuthProvider>
          </div>
        </Row>
      </Container>
    </div>
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
