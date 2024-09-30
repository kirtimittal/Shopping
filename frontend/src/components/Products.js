import React, { useEffect } from "react";
import Product from "./Product";
import "../css/Products.css";

import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../store/actions/ProductActions";
import { connect } from "react-redux";
import Filter from "./Filter";
import SortComp from "./Sort";

function Products({ products, getProductsByCategory, sortByPrice }) {
  const { parentCat, category } = useParams();
  console.log(category);
  useEffect(() => {
    getProductsByCategory(category, parentCat);
  }, [category, parentCat]);
  products = products.products;

  return (
    <div>
      <div className="header-cont">
        <h4>FILTERS</h4>
        <SortComp />
      </div>
      <hr></hr>
      <Filter category={category} parentCat={parentCat} />

      <div className="vertical-line" />
      <div className="product-cont">
        {products &&
          products.map((item) => {
            return (
              <Link to={`/${parentCat}/${category}/${item._id}`}>
                <Product key={item.id} data={item} id={item._id} />
              </Link>
            );
          })}
      </div>
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
    getProductsByCategory: (category, parentCat) =>
      dispatch(getProductsByCategory(category, parentCat)),
    //sortByPrice: (method) => dispatch(sortByPrice(method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
