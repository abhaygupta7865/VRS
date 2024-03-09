import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const cities = [
  { value: 'Bhopal', label: 'Bhopal' },
  { value: 'Indore', label: 'Indore' },
  { value: 'Delhi', label: 'Delhi' },
];

const CitySelect = (props) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = () => {
    if (selectedCity) {
      // Assuming your other JS file is named location.js
      props.setLocation(selectedCity)
      navigate("/CarsDash/Cars")
    } else {
      alert('Please select a city');
    }
  };

  return (
    <div className="city-select flex items-center mt-4">

      <select  value={selectedCity}   onChange={handleChange}  className="px-4 py-2 border rounded-md mr-4 focus:outline-none focus:ring focus:ring-blue-500" >
        <option value="">Select City</option>
        {
          cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))
        }
      </select>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" >
        Go
      </button>
    </div>
  );
};

export default CitySelect;
