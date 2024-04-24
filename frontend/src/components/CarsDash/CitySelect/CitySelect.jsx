import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDateState, setTimeValue, setLocation } from '../../../Store';

const cities = [
  { value: 'Bhopal', label: 'Bhopal' },
  { value: 'Indore', label: 'Indore' },
  { value: 'Delhi', label: 'Delhi' },
];

const CitySelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = () => {
    if (selectedCity && startDate && endDate && startTime && endTime) {
      const dateState = [{
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        key: 'selection'
      }];

      const timeValue = [
        new Date(`1970-01-01T${startTime}:00`).toISOString(),
        new Date(`1970-01-01T${endTime}:00`).toISOString(),
      ];

      dispatch(setLocation(selectedCity));
      dispatch(setDateState(dateState));
      dispatch(setTimeValue(timeValue));
      navigate("/CarsDash/Cars");
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container pt-4 flex flex-col items-center shadaw-xl shadow-yellow-300">
  {/* Banner */}
  <div className="text-white text-center py-3 font-medium text-lg rounded bg-yellow-500 w-full">
    We look forward to being a part of your next adventure!
  </div>

  {/* City Selection */}
  <div className="city-select-container bg-cover bg-no-repeat bg-center flex flex-col items-center pb-0 h-full gap-20 shadow-inset shadow-lg font-sans text-base hover:bg-opacity-75 w-full">
    <div className="city-select grid grid-rows-1 place-items-center px-2 py-2 rounded-md transition duration-300">
      <div className="flex flex-col md:flex-row md:w-full lg:w-full w-full justify-between items-center gap-32">
        {/* Dates */}
        <div className="flex flex-col space-y-2 w-1/3">
          <label htmlFor="startDate" className='text-black font-bold'>Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500 border-yellow-300 hover:border-yellow-700 w-52 text-black font-bold"
          />
          <label htmlFor="endDate" className='text-black font-bold'>End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500 border-yellow-300 hover:border-yellow-700 w-52 text-black font-bold"
          />
        </div>

        {/* City Selection */}
        <div className="grid grid-cols-1 gap-2 w-52">
          <select
            value={selectedCity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500 text-lg appearance-none border-yellow-300
            hover:border-yellow-700 text-black font-bold text-center"
          >
            <option value="" hidden className="text-yellow-600 text-lg">Select City</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Times */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="startTime" className="text-black font-bold">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500 border-yellow-300 hover:border-yellow-700 w-52 text-black font-bold"
          />
          <label htmlFor="endTime" className="text-black font-bold">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500 border-yellow-300 hover:border-yellow-700 w-52 text-black font-bold"
          />
        </div>
      </div>

      {/* Go Button */}
      <button onClick={handleClick} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 text-lg w-52 ml-10">
        Go
      </button>
    </div>
  </div>
</div>

  );
};

export default CitySelect;
