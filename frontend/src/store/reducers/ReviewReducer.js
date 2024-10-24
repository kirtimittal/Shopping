const initialState = {
  review: null,
  message: "",
  error: null,
};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REVIEW": {
      return {
        review: action.data.review,
        message: action.data.message,
        error: null,
      };
    }
    case "FAILURE": {
      return {
        ...state,
        message: "",
        error: action.error,
      };
    }
    case "GET_REVIEW": {
      return {
        ...state,
        review: action.data.review,
      };
    }
    case "RESET": {
      return {
        ...state,
        message: "",
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default ReviewReducer;
