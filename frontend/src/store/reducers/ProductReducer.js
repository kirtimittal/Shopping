const initialState = {
  products: [],
  brands: [],
  selectedProduct: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        ...state,
        products: action.products,
      };
    }
    case "GET_BRANDS": {
      return {
        ...state,
        brands: action.brands,
      };
    }
    case "GET_PRODUCTS_BY_BRANDS": {
      return {
        ...state,
        products: action.products,
      };
    }
    case "SORT_BY_PRICE": {
      console.log(state);
      if (action.method === "desc") {
        return {
          ...state,
          products: state.products.sort(
            (a, b) =>
              parseFloat(b.discountedPrice.$numberDecimal) -
              parseFloat(a.discountedPrice.$numberDecimal)
          ),
        };
      } else {
        return {
          ...state,
          products: state.products.sort(
            (a, b) =>
              parseFloat(a.discountedPrice.$numberDecimal) -
              parseFloat(b.discountedPrice.$numberDecimal)
          ),
        };
      }
    }
    case "SET_PRODUCT_SELECTED": {
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      };
    }
    default: {
      return state;
    }
  }
};

export default ProductReducer;
