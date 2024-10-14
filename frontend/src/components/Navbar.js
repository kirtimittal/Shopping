// CoroselCorosel
import "../css/Navbar.css";
import logo from "../images/logo.png";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBarDropDownItem from "./NavBarDropDownItem";

function NavigationBar() {
  const parentCategory = useSelector(
    (state) => state.categories.parentCategory
  );

  const user = useSelector((state) => state.user.user);
  // const location = useLocation();
  // let isAuth = false;
  // let username = "";
  // if (location.state) {
  //   isAuth = location.state.isAuth;
  //   username = location.state.username;
  // }

  return (
    <div>
      <nav className="nav-container">
        <div className="img-container">
          <Link to={"/"}>
            <img src={logo} alt="logo" id="img_logo"></img>
          </Link>
        </div>
        <div className="category-container">
          {parentCategory &&
            parentCategory.map((cat) => {
              return <NavBarDropDownItem parentCategory={cat} key={cat._id} />;
            })}
        </div>
        <div>
          <Search />
        </div>
        <div className="items-container">
          <ul>
            <li>
              <div>
                <div>
                  <CgProfile />
                </div>
                <div className="link-cont">
                  {user ? (
                    <div className="dropdown">
                      <div className="dropbtn user-dropdwn">{user.name}</div>
                      <div className="dropdown-content">
                        <Link to="/updateprofile">Edit Profile</Link>
                        <Link to="/wishlist">Wishlist</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/logout">Logout</Link>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}

                  {/* <Link to="/login">{isAuth ? username : "Login"}</Link> */}
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <CiHeart />
                </div>
                <div className="link-cont">
                  <Link to="/wishlist">Wishlist</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <HiOutlineShoppingBag />
                </div>
                <div className="link-cont">
                  <Link to="/cart">Bag</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default NavigationBar;
