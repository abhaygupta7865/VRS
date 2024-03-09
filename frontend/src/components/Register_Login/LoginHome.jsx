import React from "react";
import { useNavigate } from "react-router-dom";

const LoginHome = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/Register_Login/Login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col text-6xl font-bold items-center justify-center">
        Welcome!
      </div>
      <div>This is the home page.</div>
      <div className="flex flex-col items-center justify-center h-260">
        <input
          className="inputButton p-2 rounded-md border border-gray-300 text-lg"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Login"}
        />
        {loggedIn && <div> Your email address is {email} </div>}
      </div>
    </div>
  );
};

export default LoginHome;
