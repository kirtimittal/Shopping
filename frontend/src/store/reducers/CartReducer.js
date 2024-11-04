const initialState = {
  cart: [],
  items: [],
  totalPrice: 0,
  totalItems: 0,
  message: "",
  error: null,
  loading: false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "ADD_TO_CART": {
      return {
        ...state,
        loading: false,
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
        loading: false,
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
        loading: false,
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
        loading: false,
        items: filteredProducts,
        message: "",
        error: null,
      };
    }
    case "RESET_CART": {
      return {
        items: [],
        cart: [action.cart.items],
        totalPrice: action.cart.totalPrice,
        totalItems: action.cart.totalItems,
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
