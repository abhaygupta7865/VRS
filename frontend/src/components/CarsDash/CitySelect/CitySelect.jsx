import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { TimePicker } from 'antd';

import { useDispatch } from 'react-redux';
import { setDateState, setTimeValue, setLocation} from '../../../Store';

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
      startDate: new Date(),
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
      // props.setLocation(selectedCity);
      const convertedDateState = Datestate.map(item => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: item.endDate ? new Date(item.endDate) : null,
      }));
  
      const convertedTimeValue = timevalue ? [
        new Date(timevalue[0]),
        new Date(timevalue[1]),
      ] : null;
      dispatch(setLocation(selectedCity))
      dispatch(setDateState(convertedDateState));
      dispatch(setTimeValue(convertedTimeValue));
      navigate("/CarsDash/Cars");
    } else {
      alert('Please select a city');
    }
  };

  return (
    <div className="city-select-container">
      <div className="city-select flex items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:border-gray-700 transition duration-300">
        <select 
          value={selectedCity} 
          onChange={handleChange} 
          className="w-32 px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-lg appearance-none mr:4"
        >
         <option value="" hidden className="text-gray-600">Select City</option>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        
        <DateRange
          editableDateInputs={true}
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          minDate={new Date()}
          ranges={Datestate}
          className="mr-4"
        />

        <TimePicker.RangePicker 
          format="HH:MM"
          onChange={onChange}
          value={timevalue}
        />

        <button onClick={handleClick} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-lg">
          Go
        </button>
      </div>
    </div>
  );
};

export default CitySelect;
