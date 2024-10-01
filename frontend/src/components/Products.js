import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../css/Products.css";

import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../store/actions/ProductActions";
import { connect, useSelector } from "react-redux";
import Filter from "./Filter";
import SortComp from "./Sort";

function Products({
  products,
  getProductsByCategory,
  sortByPrice,
  itemsPerPage,
}) {
  const { parentCat, category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state) => state.products.totalPages);

  console.log(category);
  useEffect(() => {
    getProductsByCategory(category, parentCat, currentPage, itemsPerPage);
  }, [category, parentCat, currentPage]);
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
      <div className="allproducts-cont">
        <div className="product-cont">
          {products &&
            products.map((item) => {
              return (
                <Link
                  to={`/${parentCat}/${category}/${item._id}`}
                  key={item._id}
                >
                  <Product key={item.id} data={item} id={item._id} />
                </Link>
              );
            })}
        </div>
        <div className="page-cont">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
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
    getProductsByCategory: (category, parentCat, currentPage, itemsPerPage) =>
      dispatch(
        getProductsByCategory(category, parentCat, currentPage, itemsPerPage)
      ),
    //sortByPrice: (method) => dispatch(sortByPrice(method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
