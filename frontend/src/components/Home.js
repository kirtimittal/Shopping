import React from "react";
import NavigationBar from "./Navbar.js";
import Corosel from "./Caraousel.js";
import Categories from "./Categories.js";
import "../css/App.css";
import Footer from "./Footer.js";

function Home() {
  return (
    <div className="home-container">
      <Corosel />
      <br />
      <br />
      <h1 id="category-label">Shop By Category</h1>
      <Categories />
      <br />
      <hr className="hr-line" />
      <br />
      <Footer />
    </div>
  );
}

export default Home;
