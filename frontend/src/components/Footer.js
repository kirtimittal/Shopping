import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-light py-4 footer-div">
        <div>
          <div className="row">
            {/* Customer Service Links */}
            <div className="col-md-3">
              <h5>Customer Service</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/faq" className="text-light">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/returns" className="text-light">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="text-light">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-light">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Info Links */}
            <div className="col-md-3">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className="text-light">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-light">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-light">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-light">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-md-3">
              <h5>Stay Updated</h5>
              <p>
                Sign up for our newsletter to receive updates on special offers
                and new products.
              </p>
              {/* <form>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
              </form> */}
            </div>

            {/* Social Media Links */}
            <div className="col-md-3">
              <h5>Follow Us</h5>
              <div>
                <a href="https://facebook.com" className="text-light me-2">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://twitter.com" className="text-light me-2">
                  <FaTwitter size={20} />
                </a>
                <a href="https://instagram.com" className="text-light">
                  <FaInstagram size={20} />
                </a>
              </div>
              {/* <h6 className="mt-3">We Accept</h6>
              <img
                src="/images/payment-methods.png"
                alt="Payment Methods"
                style={{ maxWidth: "100%" }}
              /> */}
            </div>
          </div>

          <hr className="bg-light" />
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Shopify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
