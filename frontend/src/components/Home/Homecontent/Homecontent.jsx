import React from 'react'
// import carPng from "../../assets/car.png"
import BlackCarPng from "../../../assets/HomePageCar.png"
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate= useNavigate();
  const handleClick = () =>{
     navigate("/Register_Login")
  };
  return <div className='dark:bg-black dark:text-white duration-100 relative -z-20'>
    <div className="container min-h-[620px] flex">
      <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 '>
        <div
         data-aos="zoom-in"
         data-aos-duration="1500"
        className='order-1 sm:order-2'>
          <img src={BlackCarPng} alt="" 
          className="relative -z-10 max-h-[600px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"/>
        </div>
        <div className='order-2 sm:order-1 space-y-5 text-center sm:pr-32 ml-50'>
          <p 
          data-aos="fade-up"
          className='text-primary text-2xl font-serif'>Self-Drive Car Rental in Bhopal</p>
          <p 
          data-aos="fade-zoom-in"
          data-aos-delay="600"
          className='font-semibold font-serif'><b>"Chalo Chale"</b> (Let's Go) evokes a sense of adventure, exploration, and ease of travel, resonating with travelers seeking a memorable and hassle-free experience </p>
          <h1 
          data-aos="fade-up"
          data-aos-delay="1000"
          className='text-3xl'>Book your drive Now!</h1>
          <button 
           data-aos="fade-up"
           data-aos-delay="1500"
          className="btn bg-primary text-black px-6 py-2 rounded-md hover:bg-primary/80 duration-300"
          onClick={handleClick}>Get Started</button>
        </div>
      </div>
    </div>
  </div>; 
}

export default Hero