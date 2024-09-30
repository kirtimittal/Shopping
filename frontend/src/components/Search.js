import React, { useState } from "react";
import "../css/Search.css";
import { CiSearch } from "react-icons/ci";
import { connect } from "react-redux";
import { searchProduct } from "../store/actions/ProductActions";

function Search({ searchProduct }) {
  const [searchInput, setSearchInput] = useState("");

  const handleOnKey = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      console.log(searchInput);
      searchProduct(searchInput);
      setSearchInput("");
    } else {
      //setSearchInput(e.target.value);
    }
  };
  return (
    <div className="input-group mb-3 search-width">
      <CiSearch className="search-img" />
      <input
        type="text"
        className="form-control search-input"
        name="search"
        id="search"
        placeholder="Search for products"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleOnKey}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (word) => dispatch(searchProduct(word)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
