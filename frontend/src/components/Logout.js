import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/UserActions";
import { useNavigate } from "react-router-dom";
import notify from "./Notify";
function Logout({ logout, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    logout(user.user.id);
    notify("Logout Successfully", "success");
    navigate("/");
  }, []);
  return <></>;
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (userid) => dispatch(logout(userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
