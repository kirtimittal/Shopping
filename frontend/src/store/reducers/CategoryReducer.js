const initialState = {
  parentCategory: [],
  categories: [],
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES": {
      return {
        ...state,
        parentCategory: action.category.categories,
      };
    }
    case "GET_SUB_CATEGORIES": {
      console.log(state);
      return {
        ...state,
        categories: [...state.categories, action.category.categories],
      };
    }
    default: {
      return state;
    }
  }
};

export default CategoryReducer;
