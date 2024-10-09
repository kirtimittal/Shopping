import { toast } from "react-toastify";

const notify = (message, type) => {
  toast(message, {
    type: type,
    autoClose: 3000, // Close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default notify;
