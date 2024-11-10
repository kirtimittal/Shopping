import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { sortByPrice } from "../store/actions/ProductActions";
import { connect } from "react-redux";
import "../css/Filter.css";
import { useLocation } from "react-router-dom";

function SortComp({ sortByPrice }) {
  const [selected, setSelected] = useState("Sort By Price");
  const location = useLocation();
  const sortprice = (e) => {
    const id = e.target.id;
    const name = e.target.name;
    setSelected(name);
    sortByPrice(id);
  };
  useEffect(() => {
    setSelected("Sort By Price");
  }, [location]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">{selected}</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortprice} id="desc" name="High to Low">
            High to Low
          </Dropdown.Item>
          <Dropdown.Item onClick={sortprice} id="asc" name="Low to High">
            Low to High
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByPrice: (method) => dispatch(sortByPrice(method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortComp);
