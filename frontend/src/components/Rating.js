import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  console.log(value, text);
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar color="#f8e825" />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt color="#f8e825" />
          ) : (
            <FaRegStar color="#f8e825" />
          )}
        </span>
      ))}
      {text && <span> {text}</span>}
    </div>
  );
};

export default Rating;
