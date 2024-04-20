import React from 'react';

import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CarView = () => { 
  const loggedIn= useSelector(state=> state.loggedIn)
  const carData= useSelector(state=> state.carData)
  
  const navigate= useNavigate();

  
  
  const handleClick = ()=>{
      if(loggedIn){
      navigate("/CarsDash/PaymentGateway")
      }
      else {
        navigate("/Register_Login/Login");
      }
  }
 


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car image and details */}
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-full h-auto object-cover rounded-lg mb-4"
            src={carData.vehicle_image} 
            // alt={carData.vehicle_name} 
          />
          <h2 className="text-2xl font-semibold mb-2">{carData.vehicle_name}</h2> 
          <p className="text-gray-700 mb-4">{carData.vehicle_model}</p> 
          <div className="flex items-center text-gray-700 mb-2">
            
            <span>{carData.vehicle_rating}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <span>{carData.vehicle_seat_capacity} Seater</span> 
          </div>
        </div>

        {/* Booking details */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Select Date & Time</h3>
            {/* <NavLink
              to="/CarsDash/CarView/PaymentGateway" 
             className="disabled:opacity-50 cursor-pointer px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Book Now
            </NavLink> */}
            <button onClick={handleClick} className="disabled:opacity-50 cursor-pointer px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Book Now
            </button>
        </div>
        {/* <div className="flex items-center justify-between mb-2">
          <label htmlFor="date" className="text-sm font-medium">Date:</label>
            <DateRange
              editableDateInputs={true}
              onChange={item => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              ranges={state}
            />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="time" className="text-sm font-medium">Time:</label>
          <TimePicker
            id="time"
            selected={selectedTime}
            // type="time"
            // value={value}
            onChange={handleTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div> */}
      </div>
     </div>
    </div>
  );
};

export default CarView;
