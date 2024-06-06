import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import VehiclePng from '../../assets/RentalVehicle.png';



function AgentDashboard() {
  const agentDetails = useSelector(state => state.userDetails);
  const email = agentDetails.customer_email;
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    carName: '',
    brand: '',
    licensePlate: '',
    engineType: '',
    transmissionType: '',
    rentPerHour: '',
    status: 'available',
    seats: '5',
    location: '',
    city: '',
    state: '',
    errors: {},
  });

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errors: {
        ...formData.errors,
        [event.target.name]: '',
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    // Validate form fields
    if (!formData.carName.trim()) {
      errors.carName = 'Car name is required';
    }

    if (!formData.brand.trim()) {
      errors.brand = 'Brand is required';
    }

    if (!formData.licensePlate.trim()) {
      errors.licensePlate = 'License plate is required';
    }

    if (!formData.engineType.trim()) {
      errors.engineType = 'Engine type is required';
    }

    if (!formData.transmissionType.trim()) {
      errors.transmissionType = 'Transmission type is required';
    }

    if (!formData.rentPerHour.trim()) {
      errors.rentPerHour = 'Rent per hour is required';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    if (!imageFile) {
      errors.carImage = 'Image is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors });
      return;
    }

    const formDataWithImage = new FormData();

    formDataWithImage.append('carImage', imageFile);
    formDataWithImage.append('email', email);

    Object.entries(formData).forEach(([key, value]) => {
      formDataWithImage.append(key, value);
    });
    
    try {
      await axios.post('http://localhost:3080/api/AddVehicle', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data sent successfully');
      navigate('/Agent_Account');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <div className="container">
      <div className='bg-gradient-to-r from-gray-200 to-white shadow-md rounded-lg overflow-hidden mt-10 flex flex-col items-center justify-center'>
        <h1 className='text-white text-center py-3 font-medium text-lg rounded bg-pink-700 w-full'>Add Vehicle</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8">
          <div data-aos="fade-up" data-aos-delay="1000" className="flex items-center justify-center">
            <img src={VehiclePng} alt="Vehicle" className="w-full max-h-[300px] object-cover rounded-lg shadow-lg" />
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className='flex justify-between'>
                <label htmlFor="carName" className="block text-sm font-medium mb-2 p-4">
                  Car Name
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="carName"
                    name="carName"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.carName ? 'border-red-500' : ''}`}
                    value={formData.carName}
                    onChange={handleChange}
                  />
                  {formData.errors.carName && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.carName}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="brand" className="block text-sm font-medium mb-2 p-4">
                  Brand
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.brand ? 'border-red-500' : ''}`}
                    value={formData.brand}
                    onChange={handleChange}
                  />
                  {formData.errors.brand && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.brand}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="licensePlate" className="block text-sm font-medium mb-2 p-4">
                  License Plate
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.licensePlate ? 'border-red-500' : ''}`}
                    value={formData.licensePlate}
                    onChange={handleChange}
                  />
                  {formData.errors.licensePlate && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.licensePlate}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="engineType" className="block text-sm font-medium mb-2 p-4">
                  Engine Fuel Type
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="engineType"
                    name="engineType"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.engineType ? 'border-red-500' : ''}`}
                    value={formData.engineType}
                    onChange={handleChange}
                  />
                  {formData.errors.engineType && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.engineType}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="transmissionType" className="block text-sm font-medium mb-2 p-4">
                  Transmission Type
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="transmissionType"
                    name="transmissionType"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.transmissionType ? 'border-red-500' : ''}`}
                    value={formData.transmissionType}
                    onChange={handleChange}
                  />
                  {formData.errors.transmissionType && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.transmissionType}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="rentPerHour" className="block text-sm font-medium mb-2 p-4">
                  Rent Per Hour
                </label>
                <div className='p-2'>
                  <input
                    type="Number"
                    id="rentPerHour"
                    name="rentPerHour"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.rentPerHour ? 'border-red-500' : ''}`}
                    value={formData.rentPerHour}
                    onChange={handleChange}
                  />
                  {formData.errors.rentPerHour && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.rentPerHour}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="location" className="block text-sm font-medium mb-2 p-4">
                  Location
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.location ? 'border-red-500' : ''}`}
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {formData.errors.location && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.location}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="city" className="block text-sm font-medium mb-2 p-4">
                  City
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.city ? 'border-red-500' : ''}`}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {formData.errors.city && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.city}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="state" className="block text-sm font-medium mb-2 p-4">
                  State
                </label>
                <div className='p-2'>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.state ? 'border-red-500' : ''}`}
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {formData.errors.state && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.state}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="seats" className="block text-sm font-medium mb-2 p-4">
                  Seats
                </label>
                <div className='p-2'>
                  <input
                    type="number"
                    id="seats"
                    name="seats"
                    className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.seats ? 'border-red-500' : ''}`}
                    value={formData.seats}
                    onChange={handleChange}
                  />
                  {formData.errors.seats && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.seats}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-between'>
                <label htmlFor="carImage" className="block text-sm font-medium mb-2 p-4">
                  Car Image
                </label>
                <div className='p-2' >
                  <input
                    type="file"
                    id="carImage"
                    name="carImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className='w-52'
                  />
                  {formData.errors.carImage && (
                    <span className="text-red-500 text-xs mt-1">{formData.errors.carImage}</span>
                  )}
                </div>
              </div>
  
              <div className='flex justify-center'>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-pink-700 hover:bg-pink-900 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900 w-52"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default AgentDashboard;