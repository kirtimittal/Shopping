import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Carousel.css";

function Corosel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-height"
          src="https://levi.in/cdn/shop/files/Desktop_2_85216b19-299f-4cd0-a53a-1818f1a3c69f.jpg?v=1727936031"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-height"
          src="https://levi.in/cdn/shop/files/DD-Desktop_with-models.jpg?v=1729330952"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-height"
          src="https://uspoloassn.in/cdn/shop/files/festive_closet_dekstop_banner.jpg?v=1729165568"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-height"
          src="https://uspoloassn.in/cdn/shop/files/BANNER_-_BESTSELLING_KICKS_DEKSTOP_1944x.jpg?v=1729262331"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Corosel;
