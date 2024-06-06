import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header_components = [
  {
    id: "1",
    name: "HOME",
    link: "/",
  },
  {
    id: "3",
    name: "ABOUT",
    link: "/About",
  },
];

const Header = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const role = useSelector((state) => state.userDetails?.role);
  console.log(role);

  return (
    <nav className="shadow-md bg-white dark:bg-dark dark:text-white sticky">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">
              <Link to="/" className="inline-block py-2 hover:border-b-2">
                Chalo Chale
              </Link>
            </h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center gap-8">
              {
                Header_components.map((data) => (
                  <li key={data.id} className="py-4">
                    <NavLink
                      to={data.link}
                      className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))
              }
              {(role === 'customer' || !loggedIn) && (
                <li className="py-4">
                  <NavLink
                    to="/CarsDash"
                    className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    CARS
                  </NavLink>
                </li>
              )}
              {role === 'customer' && loggedIn && (
                <li className="py-4">
                  <NavLink
                    to="/MyTrip"
                    className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    TRIPS
                  </NavLink>
                </li>
              )}
              {role === 'agent' && loggedIn && (
                <li className="py-4">
                  <NavLink
                    to="/MyRental"
                    className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    MY RENTALS
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            {loggedIn ? (
              <NavLink
                to={role === 'customer' ? "/Customer_Account" : "/Agent_Account"}
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Account
              </NavLink>
            ) : (
              <Link
                to="/RegisterUser"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Register
              </Link>
            )}

            <NavLink
              to="/Register_Login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
