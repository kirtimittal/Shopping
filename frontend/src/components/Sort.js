import React from "react";
import { Dropdown } from "react-bootstrap";
import { sortByPrice } from "../store/actions/ProductActions";
import { connect } from "react-redux";
import "../css/Filter.css";

function SortComp({ sortByPrice }) {
  const sortprice = (e) => {
    const id = e.target.id;
    sortByPrice(id);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Sort By Price</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortprice} id="desc">
            High to Low
          </Dropdown.Item>
          <Dropdown.Item onClick={sortprice} id="asc">
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
    //initProducts: () => dispatch(initProducts()),
    sortByPrice: (method) => dispatch(sortByPrice(method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortComp);
