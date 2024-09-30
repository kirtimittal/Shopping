import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initBrands, initProducts } from "../store/actions/ProductActions";
import FilterCategory from "./FilterCategory";
import "../css/Filter.css";
import { getProductsByBrands } from "../store/actions/ProductActions";

function Filter({
  brands,
  initBrands,
  getProductsByBrands,
  initProducts,
  category,
  parentCat,
}) {
  useEffect(() => {
    initBrands(category, parentCat);
  }, [category, parentCat]);

  let selectedBrand = [];

  const handleOnChange = (id, checked) => {
    if (checked) {
      selectedBrand.push(id.toLowerCase());
    } else {
      const startIndex = selectedBrand.indexOf(id.toLowerCase());
      selectedBrand.splice(startIndex, 1);
    }

    let selectedBrands = selectedBrand.join(",");
    console.log(selectedBrands);
    if (selectedBrands !== "") {
      getProductsByBrands(selectedBrands, category, parentCat);
    } else {
      initProducts(category, parentCat);
    }
  };

  return (
    <div className="filter-cont">
      <h5>BRAND</h5>
      {brands &&
        brands.map((brand) => (
          <FilterCategory
            data={brand}
            onCheckChange={(id, checked) => handleOnChange(id, checked)}
          />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    brands: state.products.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initBrands: (category, parentCat) =>
      dispatch(initBrands(category, parentCat)),
    getProductsByBrands: (brand, category, parentCat) =>
      dispatch(getProductsByBrands(brand, category, parentCat)),
    initProducts: (category, parentCat) =>
      dispatch(initProducts(category, parentCat)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
