import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Example icon (you can choose any)

const ThankYouMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds to the order details page
    const timer = setTimeout(() => {
      navigate("/orders"); // Replace '/orders' with your order details page route
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <AiOutlineCheckCircle className="thank-you-icon" />
      <h2 className="thank-you-header">Thank you for placing your order!</h2>
      <p className="thank-you-para">
        You will be redirected to your order details shortly...
      </p>
    </div>
  );
};

export default ThankYouMessage;
