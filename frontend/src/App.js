import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from "./components/Home.js";
import NavigationBar from "./components/Navbar.js";
import Corosel from "./components/Caraousel.js";
import Categories from "./components/Categories.js";
import Login from "./components/Login.js";
import "./App.css";
import Products from "./components/Products.js";
import ProductDetail from "./components/ProductDetail.js";
import Cart from "./components/Cart.js";
import Signup from "./components/Signup.js";
import Logout from "./components/Logout.js";
import UpdateProfile from "./components/UpdateProfile.js";
import Wishlist from "./components/Wishlist.js";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/actions/CategoryActions.js";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Example from "./components/Notificationex.js";
import Order from "./components/Order.js";
import OrderDetails from "./components/OrderDetails.js";
import SearchProducts from "./components/SearchProducts.js";
import ConfirmOrder from "./components/ConfirmOrder.js";
import ProductOrderDetails from "./components/ProductOrderDetail.js";
import ThankYouMessage from "./components/ThankYouMessage.js";

function App() {
  // const parentCategory = useSelector(
  //   (state) => state.categories.parentCategory
  // );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <Router>
      <div className="App">
        <NavigationBar />
      </div>
      <div id="content" className="content">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/:parentCat/:category"
            element={<Products itemsPerPage={10} />}
          />
          <Route path="/:parentCat/:category/:id" element={<ProductDetail />} />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route
            path="/search/:searchInput"
            element={<Products itemsPerPage={10} />}
          />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            path="/order/:orderId/product/:productId"
            element={<ProductOrderDetails />}
          />
          <Route path="/thank-you" element={<ThankYouMessage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
