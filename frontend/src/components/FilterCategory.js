import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/Filter.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// import { getProductsByBrands } from "../store/actions/ProductActions.js";
// import { connect } from "react-redux";

function FilterCategory({ data, onCheckChange, selectedBrand }) {
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  //const [filterList, setFilterList] = useState([]);
  //   let selectedBrand = [];

  //   const handleCheckboxChange = (event) => {
  //     setChecked(event.target.checked);
  //     selectedBrand.push(event.target.id);
  //     console.log(selectedBrand);
  //     getSelectedProducts(selectedBrand);
  //   };
  useEffect(() => {
    setChecked(false);
  }, [location]);

  return (
    <div className="filter-item">
      {/* <input type="checkbox" name="cat" id="cat" />
      <label for="cat">{data}</label> */}
      <Form>
        <Form.Check
          type="checkbox"
          id={data}
          label={data}
          checked={selectedBrand.includes(data.toLowerCase()) ? true : false}
          onChange={(e) => {
            onCheckChange(e.target.id, e.target.checked);
            //setFilterList([...filterList, e.target.id]);
            setChecked(e.target.checked);
          }}
        />
      </Form>
      {/* {filterList &&
        filterList.map((item) => {
          return (
            <div className="filter-list-cont">
              <h5>{item}</h5>
            </div>
          );
        })} */}
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProductsByBrands: (brand) => dispatch(getProductsByBrands(brand)),
//   };
// };

export default FilterCategory;
