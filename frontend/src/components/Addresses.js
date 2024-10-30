import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const MultipleAddressesForm = ({ onSave }) => {
  const user = useSelector((state) => state.user.user);
  const [addresses, setAddresses] = useState([
    { street: "", country: "", city: "", state: "", postalCode: "" },
  ]);

  useEffect(() => {
    if (user) {
      if (user.address.length > 0) {
        setAddresses(user.address);
        onSave(user.address);
      }
    }
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newAddresses = [...addresses];
    newAddresses[index][name] = value;
    setAddresses(newAddresses);
    onSave(addresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { street: "", country: "", city: "", state: "", postalCode: "" },
    ]);
    onSave(addresses);
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
    onSave(newAddresses);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Pass the addresses to the parent component or save them in the backend
  //     onSave(addresses);
  //   };

  return (
    // <form onSubmit={handleSubmit}>
    <div>
      {addresses.map((address, index) => (
        <div key={index} className="address-form">
          <div className="address-lbl-cont">
            <h5>
              Address {index + 1}{" "}
              {index === 0 && <span class="required">*</span>}
            </h5>
            <div className="address-icon-div">
              <div onClick={handleAddAddress} className="plus-icon-div">
                <FaPlusCircle style={{ color: "#0d6efd" }} />
              </div>
              <div
                onClick={() => handleRemoveAddress(index)}
                style={{ display: index === 0 ? "none" : "block" }}
              >
                <FaMinusCircle style={{ color: "#0d6efd" }} />
              </div>
            </div>
          </div>
          <div>
            <Form.Label>Street:</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={address.street}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
          </div>
          {/* <div>
            <label>Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div> */}
          <div className="address-group-cont">
            <div className="margin-flex">
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={address.city}
                onChange={(event) => handleInputChange(index, event)}
                required
              />
            </div>
            <div>
              <Form.Label>State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={address.state}
                onChange={(event) => handleInputChange(index, event)}
                required
              />
            </div>
          </div>
          <div className="address-group-cont">
            <div className="margin-flex">
              <Form.Label>ZIP Code:</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={(event) => handleInputChange(index, event)}
                required
              />
            </div>
            <div>
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={address.country}
                onChange={(event) => handleInputChange(index, event)}
                required
              />
            </div>
          </div>
          {/* <button
            type="button"
            onClick={() => handleRemoveAddress(index)}
            disabled={index === 0 ? true : false}
          > */}

          {/* </button> */}
          <hr />
        </div>
      ))}

      {/* <Button variant="primary" type="submit">
        Save Addresses
      </Button>
    </form> */}
    </div>
  );
};

export default MultipleAddressesForm;
