const initialState = {
  user: null,
  token: "",
  message: "",
  loading: false,
  error: null,
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
        message: action.data.message,
        loading: false,
        error: null,
      };
    }
    case "SIGNUP": {
      console.log(action.data);
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case "LOGOUT": {
      console.log(action.data);
      return {
        ...state,
        user: null,
        token: "",
        error: null,
        loading: false,
        message: "",
      };
    }
    case "FAILURE": {
      console.log(action.data);
      return {
        ...state,
        loading: false,
        message: "",
        error: action.error,
      };
    }
    case "RESET": {
      console.log(action.data);
      return {
        ...state,
        loading: false,
        message: "",
        error: null,
      };
    }
    case "UPDATE": {
      return {
        ...state,
        user: action.data.user,
        message: action.data.message,
        loading: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default UserReducer;
