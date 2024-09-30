import { combineReducers } from "redux";
import ProductReducer from "./reducers/ProductReducer";
import CartReducer from "./reducers/CartReducer";
import UserReducer from "./reducers/UserReducer";
import WishlistReducer from "./reducers/WishlistReducer";
import CategoryReducer from "./reducers/CategoryReducer";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
  wishlist: WishlistReducer,
  categories: CategoryReducer,
});

export default rootReducer;
