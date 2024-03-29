import React from "react";
import { useNavigate } from "react-router-dom";
import VehiclePng from '../../assets/RentalVehicle.png'

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
    <div className="container mx-auto bg-gradient-to-r from-gray-200 to-white shadow-md rounded-lg overflow-hidden mt-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8">
    <div className="flex items-center justify-center animation animate__fadeIn duration-1500">
      <img src={VehiclePng} alt="Vehicle" className="w-full max-h-[300px] object-cover rounded-lg shadow-lg" />
    </div>
    <div className="text-center sm:text-left space-y-4">
      <h1 className=" text-center text-3xl font-bold text-primary">Welcome to Chalo Chale!</h1>
      <p className="text-gray-600 text-lg py-3 text-center">
      We're thrilled to have you on board.  Chalo Chale is your key to unlocking convenient and reliable vehicle rentals.
      </p>
      <p data-aos="fade-up"
      data-aos-delay="500"
      className="text-gray-600 text-lg text-center"><b>Welcome Back!</b></p>
      <div className="flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
        type="button"
        onClick={onButtonClick}
      >
        {loggedIn ? "Log Out" : "Login"}
      </button>
      {loggedIn && <div class="text-gray-600 text-base"> Your email address is {email} </div>}</div>
  </div>
    </div>
    
</div>

  );
};

export default LoginHome;
