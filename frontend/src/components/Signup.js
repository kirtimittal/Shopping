import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { signup } from "../store/actions/UserActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    //if (name === "address") {
    //   setFormData({
    //     ...formData,
    //     address: [...formData.address, value],
    //   });
    // } else {
    setFormData({
      ...formData,
      [name]: value,
    });
    //}

    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setIsValidated(false);
    } else {
      setIsValidated(true);
      signup(formData);
      alert("Signup succcess");
      navigate("/login");
    }
    console.log(formData);
  };
  return (
    <div id="signup-div">
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
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
            <Form.Label>Email address</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
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
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" id="signup-btn">
            Sign Up
          </Button>
        </Form>
      </Container>
      {user.success && <div>{alert("Signup succcess")}</div>}
      {!isValidated && (
        <div>{alert("Password and confirm Pasword does not match")}</div>
      )}
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
