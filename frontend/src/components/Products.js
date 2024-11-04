import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../css/Products.css";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../store/actions/ProductActions";
import { connect, useSelector } from "react-redux";
import Filter from "./Filter";
import SortComp from "./Sort";
import notfound from "../images/notfound.png";
import { ThreeDots } from "react-loader-spinner";

function Products({
  products,
  getProductsByCategory,
  sortByPrice,
  itemsPerPage,
  loading,
}) {
  const { parentCat, category, searchInput } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state) => state.products.totalPages);

  console.log(products);
  useEffect(() => {
    if (parentCat && category) {
      getProductsByCategory(category, parentCat, currentPage, itemsPerPage);
    }
  }, [category, parentCat, currentPage]);
  products = products.products;

  return (
    <div>
      {loading && (
        <div className="spinner-cont">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="loader-spinner"
          />
        </div>
      )}
      {products && products.length === 0 && (
        <div className="not-found-cont">
          <img src={notfound} alt="not found" />
          <h4>We couldn't find any matches!</h4>
          <div>Please check the spelling or try searching something else</div>
        </div>
      )}
      {products && products.length > 0 && (
        <>
          <div className="header-cont">
            <div>
              <h4>FILTERS</h4>
            </div>
            <SortComp />
          </div>

          <Filter
            category={category}
            parentCat={parentCat}
            searchInput={searchInput}
          />

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

          <br />
        </>
      )}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.products.loading,
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
