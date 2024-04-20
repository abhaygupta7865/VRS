import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentGateway = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const carData= useSelector(state=> state.carData)
  const Location = useSelector(state => state.location); 
  const Datestate = useSelector(state => state.dateState); 
  const Timevalue = useSelector(state => state.timeValue);

  const navigate=useNavigate();


  const onSubmit = (data) => {
    navigate("/MyTrip")
    console.log(data);
    // Here, you can add the logic to process the payment
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
