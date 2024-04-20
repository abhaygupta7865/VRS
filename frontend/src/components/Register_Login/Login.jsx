import React, { useState } from "react";
import VehiclePng from '../../assets/RentalVehicle.png';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLoggedIn, setEmail } from '../../Store';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    checkAccountExists((accountExists) => {
      if (accountExists) logIn();
      else if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
        navigate("/RegisterUser")
      }
    });
  };

  const checkAccountExists = (callback) => {
    fetch("http://localhost:3080/check-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists);
      });
  };

  const logIn = () => {
    fetch("http://localhost:3080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("success" === r.message) {
          localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
          dispatch(setLoggedIn(true));
          dispatch(setEmail(email));
          navigate("/");
        } else {
          window.alert("Wrong email or password");
        }
      });
  };

  return (
    <div className="container">
      <div className='bg-gradient-to-r from-gray-200 to-white shadow-md rounded-lg overflow-hidden mt-10 flex flex-col items-center justify-center'>
        <h1 className='text-white text-center py-3 font-medium text-lg rounded bg-pink-700 w-full'>LOGIN</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8 mt-4">
          <div data-aos="fade-up" data-aos-delay="1000" className="flex items-center justify-center">
            <img src={VehiclePng} alt="Vehicle" className="w-full max-h-[300px] object-cover rounded-lg shadow-lg" />
          </div>
          <div className="space-y-4">
            {/* <h1 className="flex flex-col text-3xl font-bold mb-4 w-full items-center">Login</h1> */}
            <div className="flex flex-col mb-4 w-full items-center mt-7">
              <input
                value={email}
                placeholder="Enter your email here"
                onChange={(ev) => setEmailState(ev.target.value)}
                className="p-2 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-red-500 text-sm">{emailError}</label>
            </div>
            <div className="flex flex-col mb-4 w-full items-center">
              <input
                value={password}
                placeholder="Enter your password here"
                onChange={(ev) => setPasswordState(ev.target.value)}
                className="p-2 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-red-500 text-sm">{passwordError}</label>
            </div>
            <div className="flex flex-col mb-4 w-full items-center">
              <button
                className="btn bg-pink-700 text-white p-2 rounded-md text-lg hover:bg-pink-900 focus:outline-none focus:ring-2 focus:bg-pink-700 w-52"
                type="button"
                onClick={onButtonClick}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
