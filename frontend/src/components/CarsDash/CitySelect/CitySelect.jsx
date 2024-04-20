import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { TimePicker } from 'antd';
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
  const [timevalue, setValue] = useState(null);
  const [Datestate, setState] = useState([
    {
      startDate: new Date().toISOString(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const onChange = (time) => {
    setValue(time);
  };

  const handleClick = () => {
    if (selectedCity) {
      const startDate = new Date(Datestate[0].startDate).toISOString();
      const endDate = Datestate[0].endDate ? new Date(Datestate[0].endDate).toISOString() : null;
      
      const startTime = timevalue ? timevalue[0].toISOString() : null;
      const endTime = timevalue ? timevalue[1].toISOString() : null;

      
      dispatch(setLocation(selectedCity))
      dispatch(setDateState([ startDate, endDate]));
      dispatch(setTimeValue([startTime, endTime]));
      navigate("/CarsDash/Cars");
    } else {
      alert('Please select a city');
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
              <div class="flex flex-col md:flex-row md:w-full lg:w-full w-full justify-between items-center gap-4">
                <div className='p-2'>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  ranges={Datestate}
                  className="mr-4 bg-pink-300"
                />
                </div>
              
              <div className='grid grid-col-1 gap-2'>
                {/* <div className='text-center text-lg font-medium py-2 px-4 rounded-full bg-teal-500 text-white hover:bg-teal-700'>Set Location</div> */}
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
              <TimePicker.RangePicker
                format="HH:MM"
                onChange={onChange}
                value={timevalue}
              />
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
