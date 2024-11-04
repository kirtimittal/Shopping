const initialState = {
  products: [],
  brands: [],
  selectedProduct: null,
  totalPages: 0,
  loading: false,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LOADING": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "GET_PRODUCTS": {
      let brands = [
        ...new Set(action.products.map((product) => product.brand)),
      ];
      return {
        ...state,
        loading: false,
        products: action.products,
        totalPages: action.totalPages,
        brands: brands,
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
    case "SEARCH_PRODUCTS": {
      let brands = [
        ...new Set(action.products.map((product) => product.brand)),
      ];
      return {
        ...state,
        products: action.products,
        totalPages: action.totalPages,
        brands: brands,
      };
    }
    default: {
      return state;
    }
  }
};

export default ProductReducer;
