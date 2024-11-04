const initialState = {
  orderDetails: null,
  orderItems: null,
  message: "",
  error: null,
  loading: false,
  //items: [],
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "ADD_ORDER": {
      return {
        ...state,
        loading: false,
        orderDetails: action.data.order,
        message: action.data.message,
        error: null,
      };
    }
    case "GET_ORDER": {
      return {
        ...state,
        loading: false,
        orderItems: action.data.order,
        message: action.data.message,
        error: null,
      };
    }
    case "SEARCH": {
      return {
        ...state,
        loading: false,
        orderItems: action.data.order,
        message: "",
        error: null,
      };
    }
    // case "ADD_ORDER_ITEMS": {
    //   // const exists = state.items.some((item) => {
    //   //     if (item._id === action.data._id) {
    //   //       return true;
    //   //     } else {
    //   //       return false;
    //   //     }
    //   //   });
    //   //   console.log(exists);
    //   //   let newItems = [];
    //   //   if (exists) {
    //   //     newItems = [...state.items];
    //   //   } else {
    //   //     newItems = [...state.items, action.data];
    //   //   }
    //   return {
    //     ...state,
    //     items: [...state.items, action.data],
    //     message: "",
    //     error: null,
    //   };
    // }
    case "FAILURE": {
      return {
        ...state,
        message: "",
        error: action.error,
        loading: false,
      };
    }
    case "RESET": {
      return {
        ...state,
        message: "",
        error: null,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default OrderReducer;
