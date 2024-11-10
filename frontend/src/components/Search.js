import React, { useState } from "react";
import "../css/Search.css";
import { CiSearch } from "react-icons/ci";
import { connect } from "react-redux";
import { searchProduct } from "../store/actions/ProductActions";
import Products from "./Products";
import { useNavigate } from "react-router-dom";

function Search({ searchProduct, itemsPerPage }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleOnKey = (e) => {
    if (e.key === "Enter") {
      setSearchInput("");

      navigate(`/search/${searchInput}`);
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
        placeholder="Search for products, brands and more..."
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
