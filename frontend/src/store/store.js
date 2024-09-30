import { thunk } from "redux-thunk";
import rootReducer from "./index.js";
import { createStore, applyMiddleware } from "redux";

export default createStore(rootReducer, applyMiddleware(thunk));
