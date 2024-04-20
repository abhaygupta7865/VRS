import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_password: '',
    customer_mobile_number: '',
    customer_date_of_birth: '',
    errors: {},
  });

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

    if (!formData.customer_name) {
      errors.customer_name = 'Name is required';
    }
    if (!formData.customer_email) {
      errors.customer_email = 'Email is required';
    } 
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.customer_email)) {
      errors.customer_email = 'Invalid email format';
    }
   
    if (!formData.customer_password) {
      errors.customer_password = 'Password is required';
    } else if (formData.customer_password.length < 7) {
      errors.customer_password = 'The password must be 8 characters or longer';
    }
    if (!formData.customer_mobile_number) {
      errors.customer_mobile_number = 'Mobile number is required';
    }
    if (!formData.customer_date_of_birth) {
      errors.customer_date_of_birth = 'Date of birth is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors });
      return;
    }
   
    try {
      const response = await axios.post('http://localhost:3080/check-account', {
        email: formData.customer_email
      });
      if (response.data.userExists) {setFormData({ ...formData, errors: {...formData.errors,customer_email: 'User already exists',}, });
        return;
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      // Handle errors appropriately (e.g., display a generic error message)
    }

    // Register user if not found
    try {
      await axios.post('http://localhost:3080/register', formData);
      console.log('User registered Successfully')
      navigate('/Register_Login'); // Redirect to success page after registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors appropriately (e.g., display a generic error message)
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customer_name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              formData.errors.customer_name ? 'border-red-500' : ''
            }`}
            value={formData.customer_name}
            onChange={handleChange}
          />
          {formData.errors.customer_name && (
            <span className="text-red-500 text-xs mt-1">{formData.errors.customer_name}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="customer_email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              formData.errors.customer_email ? 'border-red-500' : ''
            }`}
            value={formData.customer_email}
            onChange={handleChange}
          />
          {formData.errors.customer_email && (
            <span className="text-red-500 text-xs mt-1">{formData.errors.customer_email}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="customer_password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="customer_password"
            name="customer_password"
            className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              formData.errors.customer_password ? 'border-red-500' : ''
            }`}
            value={formData.customer_password}
            onChange={handleChange} 
          />
            {formData.errors.customer_password && (
              <span className="text-red-500 text-xs mt-1">{formData.errors.customer_password}</span>
            )}
          </div>
          {/* New fields for mobileNumber and dateOfBirth */}
          <div className="mb-4">
            <label htmlFor="customer_mobile_number" className="block text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="number"
              id="customer_mobile_number"
              name="customer_mobile_number"
              className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                formData.errors.customer_mobile_number ? 'border-red-500' : ''
              }`}
              value={formData.customer_mobile_number}
              onChange={handleChange}
            />
            {formData.errors.customer_mobile_number && (
              <span className="text-red-500 text-xs mt-1">{formData.errors.customer_mobile_number}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="customer_date_of_birth" className="block text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="customer_date_of_birth"
              name="customer_date_of_birth"
              className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                formData.errors.customer_date_of_birth ? 'border-red-500' : ''
              }`}
              value={formData.customer_date_of_birth}
              onChange={handleChange}
            />
            {formData.errors.customer_date_of_birth && (
              <span className="text-red-500 text-xs mt-1">{formData.errors.customer_date_of_birth}</span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
  
  export default RegisterUser;
  
