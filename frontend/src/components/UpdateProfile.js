import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { signup, updateUser } from "../store/actions/UserActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "./Notify";
import { resetMessage } from "../store/actions/UserActions";
import MultipleAddressesForm from "./Addresses";

function UpdateProfile({ signup, user }) {
  const dispatch = useDispatch();
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user.user) {
      setFormData({
        ...formData,
        name: user.user.name,
        email: user.user.email,
        mobile: user.user.mobile,
        address: user.user.address,
      });
    }
  }, [user.user]);

  useEffect(() => {
    if (user.message !== "") {
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
      dispatch(updateUser(formData, user.user.id));
      navigate("/login");
    }
  };

  return (
    <div id="signup-div">
      <Container className="signup-cont">
        <h2>Update Profile</h2>
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
              disabled={true}
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
              disabled={true}
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
          <MultipleAddressesForm
            onSave={(addresses) => {
              setFormData({
                ...formData,
                address: addresses,
              });
            }}
          />
          <Button variant="primary" type="submit" id="signup-btn">
            Update
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
