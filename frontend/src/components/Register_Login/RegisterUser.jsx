import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VehiclePng from '../../assets/RentalVehicle.png';


function RegisterUser() {
  const navigate = useNavigate();

  const [isAgent, setIsAgent] = useState(false);
  const [imageFile, setImageFile] = useState(null); 

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

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

  const handleCheckboxChange = () => {
    setIsAgent(!isAgent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
  
    if (!formData.customer_name) {
      errors.customer_name = 'Name is required';
    }
    if (!formData.customer_email) {
      errors.customer_email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.customer_email)) {
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
  
    if (!imageFile) {
      errors.profile_image = 'Image is required';
    }
  
    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3080/check-account', {
        email: formData.customer_email,
        role: isAgent ? 'agent' : 'customer', // Send role based on checkbox state
      });
      if (response.data.userExists) {
        setFormData({ ...formData, errors: { ...formData.errors, customer_email: 'User already exists', }, });
        return;
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  
    const formDataWithImage = new FormData();
    formDataWithImage.append('profile_image', imageFile);
  
    // Append role to form data
    formDataWithImage.append('role', isAgent ? 'agent' : 'customer');
  
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    console.log(formDataWithImage)
    try {
      await axios.post('http://localhost:3080/registerUser', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User registered Successfully');
      navigate('/Register_Login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  


  return (
    <div className="container">
      <div className='bg-gradient-to-r from-gray-200 to-white shadow-md rounded-lg overflow-hidden mt-10 flex flex-col items-center justify-center'>
      <h1 className='text-white text-center py-3 font-medium text-lg rounded bg-pink-700 w-full'>REGISTER</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8">
        <div data-aos="fade-up" data-aos-delay="1000" className="flex items-center justify-center">
          <img src={VehiclePng} alt="Vehicle" className="w-full max-h-[300px] object-cover rounded-lg shadow-lg" />
        </div>
        <div className="space-y-4">
          {/* <h1 className="flex flex-col text-3xl font-bold mb-4 w-full items-center">Login</h1> */}
          <div className="flex flex-col mb-4 w-full items-center mt-7">
            {/* <h1 className="text-3xl font-bold mb-8">Register</h1> */}
            <form onSubmit={handleSubmit}>

                <div className='flex justify-between'>
                    <label htmlFor="customer_name" className="block text-sm font-medium mb-2 p-4">
                      Name
                    </label>
                    
                    <div className='p-2'>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      className={`justify- w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.customer_name ? 'border-red-500' : ''
                        }`}
                      value={formData.customer_name}
                      onChange={handleChange}
                    />
                    </div>

                    {formData.errors.customer_name && (
                      <span className="text-red-500 text-xs mt-1">{formData.errors.customer_name}</span>
                    )}
              </div>
              <div className="flex justify-between">
                    <label htmlFor="customer_email" className="block text-sm font-medium mb-2 p-4">
                      Email
                    </label>

                    <div className='p-2'>
                    <input
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      className={`w-52 px-3 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.customer_email ? 'border-red-500' : ''
                        }`}
                      value={formData.customer_email}
                      onChange={handleChange}
                    />
                    </div>

                    {formData.errors.customer_email && (
                      <span className="text-red-500 text-xs mt-1">{formData.errors.customer_email}</span>
                    )}
              </div>
              <div className="flex justify-between">
                    <label htmlFor="customer_password" className="block text-sm font-medium mb-2 p-4">
                      Password
                    </label>

                    <div className='p-2'>
                    <input
                      type="password"
                      id="customer_password"
                      name="customer_password"
                      className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.customer_password ? 'border-red-500' : ''
                        }`}
                      value={formData.customer_password}
                      onChange={handleChange}
                    />
                    </div>

                    {formData.errors.customer_password && (
                      <span className="text-red-500 text-xs mt-1">{formData.errors.customer_password}</span>
                    )}
              </div>
              {/* New fields for mobileNumber and dateOfBirth */}
              <div className="flex justify-between">
                    <label htmlFor="customer_mobile_number" className="block text-sm font-medium mb-2 p-4">
                      Mobile Number
                    </label>
                    <div className='p-2'>
                    <input
                      type="number"
                      id="customer_mobile_number"
                      name="customer_mobile_number"
                      className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.customer_mobile_number ? 'border-red-500' : ''
                        }`}
                      value={formData.customer_mobile_number}
                      onChange={handleChange}
                    />
                    </div>
                    {formData.errors.customer_mobile_number && (
                      <span className="text-red-500 text-xs mt-1">{formData.errors.customer_mobile_number}</span>
                    )}
              </div>
              <div className="flex justify-between">
                <label htmlFor="customer_date_of_birth" className="block text-sm font-medium mb-2 p-4">
                  Date of Birth
                </label>
                <div className='p-2'>
                <input
                  type="date"
                  id="customer_date_of_birth"
                  name="customer_date_of_birth"
                  className={`w-52 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${formData.errors.customer_date_of_birth ? 'border-red-500' : ''}`}
                  value={formData.customer_date_of_birth}
                  onChange={handleChange}
                />
                </div>
                {formData.errors.customer_date_of_birth && (
                  <span className="text-red-500 text-xs mt-1">{formData.errors.customer_date_of_birth}</span>
                )}
              </div>
              <div className="flex justify-between">
              <label htmlFor="profile_image" className="block text-sm font-medium mb-2 p-4">
                Profile Image
              </label>
              <div className='w-52 p-2'>
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>
            </div>
              <div className="flex justify-between items-center mt-4">
                <label htmlFor="isAgent" className="block text-sm font-medium mb-2 p-4">
                  Register as Agent
                </label>
                <div className='p-2'>
                  <input
                    type="checkbox"
                    id="isAgent"
                    name="isAgent"
                    checked={isAgent}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-pink-700"
                  />
                </div>
              </div>

              <div className='flex justify-center'>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-pink-700 hover:bg-pink-900 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900 w-52"
              >
                Register
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegisterUser;

