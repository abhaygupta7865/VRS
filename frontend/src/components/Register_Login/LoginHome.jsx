import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import VehiclePng from '../../assets/RentalVehicle.png';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setEmail, setUserDetails } from '../../Store.js'; // Import setEmail action

const LoginHome = () => {
  const { loggedIn, email} = useSelector((state) => ({
    loggedIn: state.loggedIn,
    email: state.email,
  }), shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectorData = useMemo(() => ({ loggedIn, email }), [loggedIn, email]);
  const { loggedIn: memoizedLoggedIn, email: memoizedEmail } = selectorData;

  const onButtonClick = () => {
    if (memoizedLoggedIn) {
      localStorage.removeItem("user");
      dispatch(setUserDetails({ role: null })) // Set role to null on logout
      dispatch(setLoggedIn(false));
      dispatch(setEmail("")); // Set email to empty string on logout
    } else {
      navigate("/Register_Login/Login");
    }
  };

  return (
    <div className="container">
      <div className='bg-gradient-to-r from-gray-200 to-white shadow-md rounded-lg overflow-hidden mt-10 flex flex-col items-center justify-center'>
        <h1 className='text-white text-center py-3 font-medium text-lg rounded bg-pink-700 w-full'>Welcome to Chalo Chale!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8">
          <div className="flex items-center justify-center animation animate__fadeIn duration-1500">
            <img src={VehiclePng} alt="Vehicle" className="w-full max-h-[300px] object-cover rounded-lg shadow-lg" />
          </div>
          <div className="text-center sm:text-left space-y-4">
            <p className="text-gray-600 text-lg py-3 text-center">
              We're thrilled to have you on board.  Chalo Chale is your key to unlocking convenient and reliable vehicle rentals.
            </p>
            <p data-aos="fade-up"
              data-aos-delay="500"
              className="text-gray-600 text-lg text-center"><b>Welcome Back!</b></p>
            <div className="flex justify-center items-center">
              <button
                className="bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
                type="button"
                onClick={onButtonClick}
              >
                {memoizedLoggedIn ? "Log Out" : "Login"}
              </button>
              {memoizedLoggedIn && <div className="text-gray-600 text-base"> Your email address is {memoizedEmail} </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHome;
