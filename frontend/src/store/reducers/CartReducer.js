const initialState = {
  cart: [],
  items: [],
  totalPrice: 0,
  totalItems: 0,
  message: "",
  error: null,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [action.cart.items],
        totalPrice: action.cart.totalPrice,
        totalItems: action.cart.totalItems,
        message: action.message,
        error: null,
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: [action.cart.items],
        totalPrice: action.cart.totalPrice,
        totalItems: action.cart.totalItems,
        message: "",
        error: null,
      };
    }
    case "ADD_ITEMS": {
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
        message: "",
        error: null,
      };
    }
    case "REMOVE_ITEMS": {
      let filteredProducts = "";
      if (action.productid === "") {
        filteredProducts = [];
      } else {
        filteredProducts = state.items.filter(
          (item) => item._id !== action.productid
        );
      }

      return {
        ...state,
        items: filteredProducts,
        message: "",
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default CartReducer;
