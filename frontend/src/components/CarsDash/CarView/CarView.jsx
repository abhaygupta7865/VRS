import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar, FaArrowRight, FaStarHalfAlt } from "react-icons/fa";
import {  FaRegRectangleList } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdViewHeadline } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CarViewEdit = () => {
  const loggedIn = useSelector(state => state.loggedIn);
  const carData = useSelector(state => state.carData);
  const bookingStartTimeStamp = useSelector(state => state.bookingStartTimeStamp);
  const bookingEndTimeStamp = useSelector(state => state.bookingEndTimeStamp);
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState(null);
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;
  };

  const calculateHoursDifference = (startTimeStamp, endTimeStamp) => {
    const startDate = new Date(startTimeStamp);
    const endDate = new Date(endTimeStamp);
    const timeDifference = endDate.getTime() - startDate.getTime(); 
    const hoursDifference = timeDifference / (1000 * 60 * 60); 
    
    return Math.round(hoursDifference); 
  };

  const formattedBookingStartTime = formatTimestamp(bookingStartTimeStamp);
  const formattedBookingEndTime = formatTimestamp(bookingEndTimeStamp);
  const hoursDifference = calculateHoursDifference(bookingStartTimeStamp, bookingEndTimeStamp);

  const totalAmount = hoursDifference * carData.vehicle_rent + 129 + 99;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await axios.post('http://localhost:3080/create-order', {
          amount: totalAmount, 
          currency: 'INR',
          receipt: `receipt_${Date.now()}`
        });
        setOrderId(response.data.id);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    createOrder();
  }, [totalAmount]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    if (!userDetails) {
      alert('User is not logged in');
      return;
    }

    const options = {
      key: 'rzp_test_mPlGrfChkI081N', // Replace with your test key
      amount: totalAmount * 100, // amount in paise
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId,
      handler: async function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);

        // Verify the payment signature on the server
        try {
          const verifyResponse = await axios.post('http://localhost:3080/verify-signature', {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResponse.data.success) {
            navigate('/payment-success');
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      },
      prefill: {
        name: userDetails.customer_name || 'Guest',
        email: userDetails.customer_email || 'guest@example.com',
        contact: userDetails.customer_mobile_number || '0000000000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleClick = () => {
    if (loggedIn) {
      handlePayment();
    } else {
      navigate("/Register_Login/Login");
    }
  };

  return (
    <div className="w-full h-screen">
      {/* Page-Car-Details */}
      <div className="font-sans font-normal text-base antialiased bg-gray-100 box-border max-h-screen flex flex-row p-4 md:p-8 h-full min-h-full overflow-auto">
        <div>
          {/* Back-btn */}
          <div className="font-sans font-normal text-base antialiased flex items-center gap-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-8 cursor-pointer">
              <IoIosArrowBack />
              <span>Back</span>
            </div>
          </div>
          {/* Details-of-car */}
          <div className="font-sans font-normal text-base antialiased bg-white box-border block flex-shrink-0 flex-grow">
            <div className="font-sans font-normal text-base antialiased bg-gray-100 box-border flex flex-row gap-2 justify-between h-full min-h-full overflow-auto">
              {/* Left Section */}
              <div className="font-normal text-base antialiased font-sans box-border max-w-70 flex flex-col gap-5 mr-10">
                {/* left-Image */}
                <div className="rounded-lg shadow-md">
                  <div className="relative w-full overflow-hidden rounded-md border border-gray-300">
                    <div className="flex justify-center bg-white w-full h-96 cursor-pointer">
                      <img src={carData.vehicle_image} alt="" className="w-4/5 h-auto object-cover rounded-lg mb-4"/>
                    </div>
                  </div>
                </div>
                {/* From-TO Details */}
                <section className="font-sans text-base antialiased bg-white py-4 px-6">
                  <div className="grid grid-row-6-4">
                    <div className="grid grid-row-repeat(2, 1fr)">
                      {/* Contain-Form-Detials */}
                      <div className="From">
                        <div className="font-bold leading-tight text-gray-900">From</div>
                        <div className="leading-relaxed text-gray-900 mt-2">{formattedBookingStartTime}</div>
                        <div className="text-sm text-gray-400 leading-normal">
                          {/* Address details */}
                        </div>
                      </div>
                      {/* Contain-to-Details */}
                      <div className="font-sans text-base antialiased">
                        <div className="font-sans text-base font-bold leading-tight text-gray-900">To</div>
                        <div className="font-sans text-base leading-relaxed text-gray-900 mt-2">{formattedBookingEndTime}</div>
                        <div className="text-sm text-gray-400 leading-normal">
                          {/* Address details */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Car-Specification */}
                <div className="font-sans text-base antialiased shadow-md rounded-lg bg-white p-4">
                  <div>
                    <div className="font-sans text-base antialiased">
                      <div className="flex justify-between border-b border-gray-300 flex-row">
                        <div>
                          {/* Car-Info */}
                          <div className="w-full order-1 pb-6">
                            {/* Car-Name */}
                            <span className="font-sans text-xl font-bold leading-tight text-gray-900 tracking-tight">{carData.vehicle_name}</span>
                            {/* Car-Accessories */}
                            <div className="flex">
                              <span className="font-sans text-sm leading-4 text-gray-400 mr-1">{carData.vehicle_transmission_type}</span>
                              <span className="h-1 w-1 bg-gray-400 rounded-full mr-1 mt-2"></span>
                              <span className="font-sans text-sm leading-4 text-gray-400 mr-1">{carData.vehicle_seat_capacity}</span>
                            </div>
                          </div>
                        </div>
                        {/* Car-Rating */}
                        <div className="order-2 mb-4">
                          <span className="font-sans text-base antialiased font-bold leading-tight text-gray-900">{carData.vehicle_rating}</span>
                          <div className="font-sans text-base antialiased font-normal text-gray-900">
                            <div className="font-sans text-base antialiased text-amber-500 text-sm">
                              <span className="font-sans text-base antialiased">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Car-Detail */}
                      <div className="font-sans text-base antialiased mt-5 text-gray-400">
                        <div className="flex flex-row items-center mb-2 gap-2">
                          <div>
                            <SlCalender />
                          </div>
                          <div>Model {carData.vehicle_model_year}</div>
                        </div>
                        <div className="flex flex-row items-center mb-2 gap-2">
                          <div>
                            <FaArrowRight />
                          </div>
                          <div>{carData.vehicle_distance} km driven</div>
                        </div>
                        <div className="flex flex-row items-center mb-2 gap-2">
                          <div>
                            <MdViewHeadline />
                          </div>
                          <div>Chassis number: {carData.vehicle_chassis_number}</div>
                        </div>
                        <div className="flex flex-row items-center mb-2 gap-2">
                          <div>
                            <FaRegRectangleList />
                          </div>
                          <div>Engine number: {carData.vehicle_engine_number}</div>
                        </div>
                        <div className="flex flex-row items-center mb-2 gap-2">
                          <div>
                            <RiPagesLine />
                          </div>
                          <div>Registration number: {carData.vehicle_registration_number}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Section */}
              <div className="font-sans text-base antialiased box-border mt-0.5 w-full md:w-auto lg:w-96">
                {/* Booking-summary */}
                <div className="bg-white p-5 shadow-md rounded-lg">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">Booking Summary</h3>
                    <div className="flex justify-between items-center mt-4 text-gray-400 text-base">
                      <span>Car Rent (for {hoursDifference} hours)</span>
                      <span>₹{carData.vehicle_rent * hoursDifference}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-gray-400 text-base">
                      <span>Convenience Fee</span>
                      <span>₹129</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-gray-400 text-base">
                      <span>Taxes</span>
                      <span>₹99</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-gray-900 text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <button
                      onClick={handleClick}
                      className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
                {/* Car-Policies */}
                <div className="bg-white p-5 mt-4 shadow-md rounded-lg">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">Car Policies</h3>
                    <ul className="list-disc list-inside text-gray-400 text-base mt-2">
                      <li>Unlimited kilometers included</li>
                      <li>Fuel not included</li>
                      <li>Damage charges will apply</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarViewEdit;
