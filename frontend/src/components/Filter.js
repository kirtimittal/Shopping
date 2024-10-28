import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { initBrands, initProducts } from "../store/actions/ProductActions";
import FilterCategory from "./FilterCategory";
import "../css/Filter.css";
import { getProductsByBrands } from "../store/actions/ProductActions";
import CategoryItem from "./CategoryItem";

function Filter({
  brands,
  initBrands,
  getProductsByBrands,
  initProducts,
  category,
  parentCat,
  searchInput,
}) {
  const [selectedBrand, setSelectedBrand] = useState([]);
  let products = useSelector((state) => state.products.products);
  //const [brands, setBrands] = useState(null);
  //const brands = [...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    if (category && parentCat) {
      initBrands(category, parentCat);
    }
  }, [category, parentCat]);

  useEffect(() => {
    let selectedBrands = selectedBrand.join(",");
    if (selectedBrands !== "") {
      getProductsByBrands(selectedBrands, category, parentCat, searchInput);
    } else {
      initProducts(category, parentCat, searchInput);
    }
  }, [selectedBrand]);

  const handleOnChange = (id, checked) => {
    if (checked) {
      setSelectedBrand([...selectedBrand, id.toLowerCase()]);
    } else {
      const startIndex = selectedBrand.indexOf(id.toLowerCase());
      selectedBrand.splice(startIndex, 1);
      let newBrand = [...selectedBrand];
      console.log(newBrand);
      setSelectedBrand(newBrand);
    }
  };

  return (
    <div className="filter-cont">
      <h5>BRAND</h5>
      {brands &&
        brands.map((brand, index) => (
          <FilterCategory
            data={brand}
            key={index}
            onCheckChange={(id, checked) => handleOnChange(id, checked)}
          />
        ))}
      <div className="brand-div">
        {selectedBrand &&
          selectedBrand.map((brand, index) => {
            return (
              <CategoryItem
                key={index}
                data={brand}
                onCloseClick={(id, checked) => handleOnChange(id, checked)}
              />
            );
          })}
      </div>
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
    getProductsByBrands: (brand, category, parentCat, searchInput) =>
      dispatch(getProductsByBrands(brand, category, parentCat, searchInput)),
    initProducts: (category, parentCat, searchInput) =>
      dispatch(initProducts(category, parentCat, searchInput)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
