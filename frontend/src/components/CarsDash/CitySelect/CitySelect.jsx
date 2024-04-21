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
    <div className='container pt-4'>
      <div className='text-base font-sans'>
        <div className=' text-white text-center py-3 font-medium text-lg rounded bg-pink-700'>
          We look forward to being a part of your next adventure!
        </div>
        <div className='bg-cover bg-no-repeat bg-center flex flex-col items-center justify-start pb-0 h-full gap-20 shadow-inset shadow-lg font-sans text-base hover:background-color'>
          <div className="city-select-container">
            <div className="city-select grid grid-row-1 place-items-center px-2 py-2 rounded-md transition duration-300">
              <div className="flex flex-col md:flex-row md:w-full lg:w-full w-full justify-between items-center gap-4">
                <div className='p-2'>
                  <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              
                <div className='grid grid-col-1 gap-2'>
                  <div className='text-center text-ms font-medium py-2 px-4 rounded-full bg-pink-700 text-gray-400 hover:bg-pink-900'>
                    <select
                      value={selectedCity}
                      onChange={handleChange}
                      className="w-32 px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-lg appearance-none mr:4"
                    >
                      <option value="" hidden className="text-gray-600 text-lg">Select City</option>
                      {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='text-center text-lg font-medium py-2 px-4 rounded-full bg-pink-700 text-black hover:bg-pink-900'>
                  <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                      type="time"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                      type="time"
                      id="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <button onClick={handleClick} className="mr-4 px-4 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-900 text-lg">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelect;
