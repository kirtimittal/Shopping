export const getCategories = () => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/category/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        data.categories.forEach((category) => {
          fetch(`http://localhost:4000/api/category/${category._id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.categories.length !== 0) {
                dispatch({
                  type: "GET_SUB_CATEGORIES",
                  category: data,
                });
              }
            })
            .catch((err) => alert(err));
        });

        dispatch({
          type: "GET_CATEGORIES",
          category: data,
        });
      })
      .catch((err) => alert(err));
  };
};
