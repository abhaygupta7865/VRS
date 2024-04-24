import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentGateway = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const carData = useSelector(state => state.carData);
  const Location = useSelector(state => state.location);
  const dateState = useSelector(state => state.dateState);
  const timeValue = useSelector(state => state.timeValue);
  const startTimeStamp = useSelector((state) => state.startTimeStamp)
  const endTimeStamp = useSelector((state) => state.endTimeStamp)


  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // const calculateTotalPrice = (rent, startTime, endTime) => {
  //   const start = new Date(`1970-01-01T${startTime}:00`).getHours();
  //   const end = new Date(`1970-01-01T${endTime}:00`).getHours();
  //   const hours = end - start;
  //   return rent * hours;
  // };
  const startTime = timeValue[0].split('T')[1].split('.')[0]; // Extracting startTime
  const endTime = timeValue[1].split('T')[1].split('.')[0];
  
  const addTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(0, 0, 0, hours, minutes);
    date.setMinutes(date.getMinutes() + 330); // Adding 330 minutes (5 hours 30 minutes)
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const updatedBookingStartTime = addTime(startTime);
  const updatedBookingEndTime = addTime(endTime);


  const onSubmit = async (data) => {
    try {
      const bookingData = {
        vehicle_id: carData.vehicle_id,
        customer_email: user.email,
        booking_start_date: dateState[0].startDate,
        booking_end_date: dateState[0].endDate,
        booking_date: new Date().toISOString(),
        booking_status: 'upcoming',
        total_price: carData.vehicle_rent,
        payment_status: 'success',
        payment_method: 'card',
        created_at: new Date().toISOString(),
        booking_start_time: updatedBookingStartTime,
        booking_end_time: updatedBookingEndTime,
        booking_location: Location,
        starting_time: startTimeStamp,
        end_time: endTimeStamp
      };

      const response = await axios.post('http://localhost:3080/api/bookings', bookingData);

      if (response.status === 200) {
        navigate("/MyTrip");
        console.log("Booking successful", response.data);
      } else {
        console.log("Booking failed", response.data);
      }
    } catch (error) {
      console.error("Error booking", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">Card Number</label>
            <input
              type="number"
              id="cardNumber"
              {...register('cardNumber', { required: true })}
              className={`mt-1 p-2 w-full rounded-md border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter card number"
            />
            {errors.cardNumber && <span className="text-red-500 text-sm">Card number is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">Expiry Date</label>
            <input
              type=""
              id="expiryDate"
              {...register('expiryDate', { required: true })}
              className={`mt-1 p-2 w-full rounded-md border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="MM/YY"
            />
            {errors.expiryDate && <span className="text-red-500 text-sm">Expiry date is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">CVV</label>
            <input
              type="text"
              id="cvv"
              {...register('cvv', { required: true })}
              className={`mt-1 p-2 w-full rounded-md border ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="CVV"
            />
            {errors.cvv && <span className="text-red-500 text-sm">CVV is required</span>}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <AiOutlineCreditCard className="inline-block mr-2" />
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
