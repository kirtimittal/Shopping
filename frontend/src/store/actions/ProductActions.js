let BASE_URL = "http://localhost:4000";
export const initProducts = (category, parentCat, searchInput) => {
  let products = [];
  return (dispatch) => {
    fetch(`${BASE_URL}/products/${parentCat}/${category}/${searchInput}`)
      //   .then((res) => {
      //     console.log(res);
      //     products = res;
      //     dispatch({
      //       type: "GET_PRODUCTS",
      //       products,
      //     });
      //   })
      .then((response) => response.json())
      .then((data) => {
        products = data;
        console.log(data);
        dispatch({
          type: "GET_PRODUCTS",
          products,
        });
      })
      .catch((err) => alert(err));
  };
};

export const initBrands = (category, parentCat) => {
  let brands = [];
  return (dispatch) => {
    fetch(`${BASE_URL}/brands/${parentCat}/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        brands = data;
        dispatch({
          type: "GET_BRANDS",
          brands,
        });
      })
      .catch((err) => alert(err));
  };
};

export const getProductsByBrands = (
  selectedBrand,
  category,
  parentCat,
  searchInput
) => {
  let products = [];
  return (dispatch) => {
    fetch(
      `${BASE_URL}/getProductsByBrand/${parentCat}/${category}/${selectedBrand}/${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        products = data;
        dispatch({
          type: "GET_PRODUCTS_BY_BRANDS",
          products,
        });
      })
      .catch((err) => alert(err));
  };
};

export const getProductsByCategory = (
  category,
  parentCat,
  currentPage,
  limit
) => {
  let products = [];
  return (dispatch) => {
    fetch(
      `${BASE_URL}/getProductsByCategory/${parentCat}/${category}?page=${currentPage}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        products = data.selectedProducts;
        dispatch({
          type: "GET_PRODUCTS",
          products,
          totalPages: data.totalPages,
        });
      })
      .catch((err) => alert(err));
  };
};

export const sortByPrice = (method) => {
  console.log(method);
  return (dispatch) => {
    dispatch({
      type: "SORT_BY_PRICE",
      method,
    });
  };
};

export const searchProduct = (word) => {
  let products = [];
  return (dispatch) => {
    fetch(`${BASE_URL}/search/${word}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        products = data;
        dispatch({
          type: "GET_PRODUCTS",
          products,
        });
      })
      .catch((err) => alert(err));
  };
};

export const getProductById = (id) => {
  let selectedProduct = {};
  return (dispatch) => {
    fetch(`${BASE_URL}/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        selectedProduct = data;
        console.log(selectedProduct);
        dispatch({
          type: "SET_PRODUCT_SELECTED",
          selectedProduct,
        });
      })
      .catch((err) => alert(err));
  };
};
