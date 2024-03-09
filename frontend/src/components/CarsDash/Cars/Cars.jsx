import React, { useState, useEffect, isLoading, error } from 'react';
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import car1 from "../../../assets/white-car.png";
import car2 from "../../../assets/car5.png";
import car3 from "../../../assets/car6.png";

// const carListData = [
//   {
//     name: "Range Rover 2020",
//     rating: 4.25,
//     price: 100,
//     image: car1,
//     type: "Manual",
//     engine: "Diesel",
//     seats: "5 Seats",
//     availavility: "Available from date",
//     loaction: "Bhopal",
//     aosDelay: "300",
//   },
//   {
//     name: "SCORPIO S11 2020",
//     rating: 4.44,
//     price: 140,
//     image: car2,
//     type: "Manual",
//     engine: "Diesel",
//     seats: "7 Seats",
//     availavility: "Available from date",
//     loaction: "Bhopal",
//     aosDelay: "600",
//   },
//   {
//     name: "SCORPIO S8 2018",
//     rating: 4.37,
//     price: 100,
//     image: car3,
//     type: "Manual",
//     engine: "Diesel",
//     seats: "7 Seats",
//     availavility: "Available from date",
//     loaction: "Bhopal",
//     aosDelay: "900",
//   },
// ]

const Cars = (props) => {
  const {location} = props
  console.log(location)
  const [carListData, setCarList] = useState([]);

  useEffect(() => {
    // Fetch car data on component mount
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/vehicles',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location }),
        });
        const data = await response.json();
        setCarList(data);
      } catch (err) {
        console.error(err);
        // Handle error gracefully (e.g., display an error message)
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
      <div className="container">
        {/* {heading} */}
        <h1
          data-aos="fade-up"
          data-aos-delay="0"
          className='text-white text-3xl sm:text-4xl font-semibols font-serif mb-3'>POPULAR CAR IN {location}</h1>
        {/* {Car Listing Cards} */}
        {isLoading && (
          <div className="text-center mt-4">
            <p>Loading cars...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-4">
            <p>Error fetching cars: {error.message}</p>
          </div>
        )}
        {!isLoading && !error && carListData.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            <p>No cars found.</p>
          </div>
        )}
        {!isLoading && !error && carListData.length > 0 && (
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
              {carListData.map((data) => (
                <div key={data.name}
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  className='border space-y-3 border-gray-300 hover:border-primary font-ibm-plex-sans p-3 rounded-xl relative group cursor-pointer'>
                  <div className='w-full h-[300px]'>
                    <img className="object-contain sm:translate-x-8 group-hover:translate-x-16 duration-700"
                      src={data.image} alt="" />
                  </div>
                  <div className="relative p-5">
                    <div className="flex items-center gap-5">
                      <div>
                        <FaStar className='text-primary h-15' />
                      </div>
                      <div className=''>{data.rating}</div>
                    </div>
                    <div className="mt-2 text-sm sm:text-lg font-bold leading-loose tracking-tight text-primary">{data.name}</div>
                    <div className="flex items-center gap-5 my-1 text-xl font-normal leading-loose tracking-wider text-gray-400 sm:w-100px">
                      <div>{data.type}</div>
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <div>{data.engine}</div>
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <div>{data.seats}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-solid border-gray-300 pr-4">
                    <div className='p-5'>
                      <div className="font-normal leading-6 tracking-wider text-gray-500 text-lg">{data.availability}</div>
                        <div className="text-xl font-bold leading-loose tracking-tight text-primary">₹{data.price}/hr</div>
                      </div>
                      <div className="flex items-center gap-4 p-2 border border-gray-500 rounded-2xl">
                        <div><CiLocationOn className="text-green-500 text-3xl" /></div>
                        <div className="text-gray-500 text-"><b>{data.location}</b></div>
                      </div>
                    </div>
                  </div>
              ))}
              </div>
            </div>
            )}
          </div>
          <div className="grid place-content-center mt-8">
            <button data-aos="fade-up"
              data-aos-delay="1200"
              className="button-outline">
              Get Started
            </button>
          </div>
        </div>
  )
 };

export default Cars