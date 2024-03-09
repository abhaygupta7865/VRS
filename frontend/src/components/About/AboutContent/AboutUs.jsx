import React from 'react'
import CarPng from '../../../assets/car1.png'

const About = () => {
  return (
    <div className='dark:bg-dark bg-slate-100 dark:text-white duration-300 sm:min-h-[600]
    sm:grid sm:place-item-center'>
      <div className='container'>
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right"
            data-aos-duration="1500"
            data-aos-once="false">
            <img src={CarPng} alt="" className='sm:scale-105 sm:translate-x-11 max-h-[300px] drop-shadow-[]'/>
          </div>
          <div>
            <div className='space-y-5 sm:p-16 pb-6'>
              <h1 data-aos="fade-up"
              className='text-3xl sm:text-4xl font-bold font-serif'>About Us</h1>
              <p data-aos="fade-up">Our name, "<b>Chalo Chale</b>," translates to "<b>Let's Go</b>" in Hindi, and it embodies our mission: to empower your travels and fuel your sense of adventure. We believe renting a car should be effortless, allowing you to focus on creating lasting memories with your loved ones.</p>

              <p data-aos="fade-up"><b>Chalo Chale</b> is more than just renting a car. It's about providing the freedom and flexibility to explore, discover, and create unforgettable experiences.</p>
              <button data-aos="fade-up"
              className='button-outline'>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About