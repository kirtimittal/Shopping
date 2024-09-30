const initialState = {
  wishlistProducts: [],
  error: null,
  items: [],
};

function WishlistReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      return {
        ...state,
        wishlistProducts: [...state.wishlistProducts, action.data],
        error: null,
      };
    }
    case "ERROR": {
      return {
        ...state,
        error: action.data,
      };
    }
    case "ADD_TO_ITEMS": {
      const exists = state.items.some((item) => {
        if (item._id === action.data._id) {
          return true;
        } else {
          return false;
        }
      });
      console.log(exists);
      let newItems = [];
      if (exists) {
        newItems = [...state.items];
      } else {
        newItems = [...state.items, action.data];
      }
      return {
        ...state,
        items: newItems,
        error: null,
      };
    }
    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        error: null,
        items: state.items.filter((item) => item._id !== action.productid),
        wishlistProducts: state.wishlistProducts.filter(
          (product) =>
            product.productid !== action.productid &&
            product.userid !== action.userid
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export default WishlistReducer;
