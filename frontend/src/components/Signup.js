import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { resetMessage, signup } from "../store/actions/UserActions";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MultipleAddressesForm from "./Addresses";
import notify from "./Notify.js";

function Signup({ signup, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: [],
  });
  const [isValidated, setIsValidated] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!isValidated) {
      notify("Password and confirm Password does not match", "error");
    }
  }, [isValidated]);

  useEffect(() => {
    if (user.message === "Signup Successfull") {
      notify(user.message, "success");
      dispatch(resetMessage());
      navigate("/");
    } else if (user.message !== "") {
      notify(user.message, "info");
      dispatch(resetMessage());
    }
  }, [user.message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setIsValidated(false);
    } else {
      setIsValidated(true);
      signup(formData);
    }
  };
  return (
    <div id="signup-div">
      <Container className="signup-cont">
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              Name<span class="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email address<span class="required">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Password<span class="required">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>
              Confirm Password<span class="required">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicMobile">
            <Form.Label>
              Phone No<span class="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <MultipleAddressesForm
            onSave={(addresses) => {
              setFormData({
                ...formData,
                address: addresses,
              });
            }}
          />

          <Button variant="primary" type="submit" id="signup-btn">
            Sign Up
          </Button>
        </Form>
      </Container>
      {user.success && <div>{notify("Signup Successful", "success")}</div>}
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
    signup: (formdata) => dispatch(signup(formdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
