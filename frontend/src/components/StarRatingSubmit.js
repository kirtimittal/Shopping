import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addReview, resetMessage } from "../store/actions/ReviewActions";
import notify from "./Notify";
import { Button } from "react-bootstrap";

const StarRatingSubmit = ({ productId, status }) => {
  const user = useSelector((state) => state.user);
  const message = useSelector((state) => state.review.message);
  const error = useSelector((state) => state.review.error);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (message !== "") {
      notify(message, "success");
      dispatch(resetMessage());
    } else if (error !== null) {
      notify(message, "error");
      dispatch(resetMessage());
    }
  }, [message, error]);

  const submitRating = () => {
    dispatch(
      addReview(
        user.user.name,
        rating,
        user.user.id,
        comment,
        productId,
        user.token
      )
    );
    // try {
    //   const { data } = await axios.post(
    //     `/api/products/${productId}/reviews`,
    //     {
    //       rating,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   setMessage("Rating submitted successfully!");
    // } catch (error) {
    //   setMessage("Error submitting rating");
    // }
  };

  return (
    <div className="rating-rev-cont">
      <h3>Rate this product:</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            <FaStar
              size={30}
              color={star <= (hover || rating) ? "#f8e825" : "#e4e5e9"}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(star)}
              style={{ cursor: "pointer" }}
            />
          </span>
        ))}
      </div>
      <div className="comment-div">
        <h5>Add Comment(optional)</h5>
        <textarea
          rows={3}
          cols={20}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button
        onClick={submitRating}
        disabled={status === "Delivered" ? false : true}
      >
        Submit
      </Button>
    </div>
  );
};

export default StarRatingSubmit;
