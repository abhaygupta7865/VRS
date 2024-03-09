import React from 'react'
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const Services = () => {

  const skillsData = [
    {
      name: "Best Price",
      icon: (
        <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300"/>
      ),
      link: "#",
      description: "No hidden fees, just upfront and competitive rates. We ensure you get the best value for your money.",
      aosDelay: "0",
    },
    {
      name: "Fast and Safe",
      icon: (
        <GiNotebook  className="text-5xl text-primary group-hover:text-black duration-300"/>
      ),
      link: "#",
      description: "Book your car in minutes from the comfort of your home with our user-friendly website",
      aosDelay: "500",
    },
    {
      name: "Experience Driver",
      icon: (
        <SlNote className="text-5xl text-primary group-hover:text-black duration-500"/>
      ),
      link: "#",
      description: "we can provide access to experienced and licensed drivers who are familiar with the local area, allowing you to relax and enjoy the ride",
      aosDelay: "1000",
    }
  ]
  return (
    <div className='pb-14 dark:bg-black dark:text-white sm:min-h-[600px] sm:grid sm:place-items-center'>
      <div className="container">
        <div className="pb-12">
          <h1 className='text-3xl font-semibold text-center font-serif sm:text-4xl'>
            Why Choose Us
          </h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {
              skillsData.map((skill) => (
                <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className='card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg'
                >
                  <div className='grid place-items-center' >{skill.icon}</div>
                  <h1 className='text-2xl'><b>{skill.name}</b></h1>
                  <p className='text-lg font-serif'>{skill.description}</p>
                  <br />
                  <a href={skill.link} className='text-xl text-primary hover:text-black'>Learn More</a>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Services