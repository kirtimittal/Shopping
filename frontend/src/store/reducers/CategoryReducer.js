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
      let newCat = [];
      if (state.categories.includes(action.category.categories)) {
        newCat = [...state.categories];
      } else {
        newCat = [...state.categories, action.category.categories];
      }
      return {
        ...state,
        categories: newCat,
      };
    }
    default: {
      return state;
    }
  }
};

export default CategoryReducer;
