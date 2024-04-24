import React, { useState, useEffect, error } from 'react';
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCarData, setBookingStartTimeStamp, setBookingEndTimeStamp } from '../../../Store'


const Cars = () => {
  const loggedIn = useSelector(state => state.loggedIn);
  const Location = useSelector(state => state.location); 
  const dateState = useSelector(state => state.dateState); 
  const timeValue = useSelector(state => state.timeValue); 

  const dispatch = useDispatch();

  const [carListData, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


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

  const combineDateTime = (date, time) => {
    const [year, month, day] = date.split('T')[0].split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const seconds = 0; // Set seconds to 00 by default
  
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error('Invalid time value');
    }
  
    const dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date or time value');
    }
  
    const offsetMinutes = 330; // Offset for +05:30 timezone
    const offsetHours = Math.floor(offsetMinutes / 60);
    const offsetMinutesPart = String(offsetMinutes % 60).padStart(2, '0');
  
    return `${dateObj.toISOString().slice(0, 19)}+${String(offsetHours).padStart(2, '0')}:${offsetMinutesPart}`;
  };
  

  const bookingStartTimeStamp = combineDateTime(dateState[0].startDate, updatedBookingStartTime);
  const bookingEndTimeStamp = combineDateTime(dateState[0].endDate, updatedBookingEndTime);

  useEffect(() => {
    dispatch(setBookingStartTimeStamp(bookingStartTimeStamp));
    dispatch(setBookingEndTimeStamp(bookingEndTimeStamp));
  }, [dispatch, bookingStartTimeStamp, bookingEndTimeStamp]);
  

  const handleClick = (CarDetails) => {
    dispatch(setCarData(CarDetails))
    if (loggedIn) {
      navigate("/CarsDash/CarView");
    } else {
      navigate("/Register_Login/Login");
    }
};

  useEffect(() => {
    // Fetch car data on component mount
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3080/api/vehicles',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({Location, bookingStartTimeStamp, bookingEndTimeStamp}),
        });
        const data = await response.json();
        setCarList(data);
      } catch (err) {
        // console.error(err);
        // Handle error gracefully (e.g., display an error message)
      }
      finally {
        setIsLoading(false); // Set isLoading to false regardless of success or error
      }
    };

    fetchData();
  }, [Location, bookingStartTimeStamp, bookingEndTimeStamp]);
  
  
  return (
    <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
      <div className="container">
        {/* {heading} */}
        <h1
          data-aos="fade-up"
          data-aos-delay="0"
          className='text-white text-3xl sm:text-4xl font-semibols font-serif mb-3'>POPULAR CAR IN {Location}</h1>
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
              {
              carListData.map((data) => (
                // <NavLink key={data.vehicle_id} to={`/car-details/${data.vehicle_id}`}>
                 <div key={data.vehicle_id}
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  className='border space-y-3 border-gray-300 hover:border-primary font-ibm-plex-sans p-3 rounded-xl relative group cursor-pointer'>
                  <div className='w-full h-[300px]'>
                    <img className="object-contain sm:translate-x-8 group-hover:translate-x-16 duration-700"
                      src= {data.vehicle_image} alt="image here" />
                  </div>
                  <div className="relative p-5">
                    <div className="flex items-center gap-5">
                      <div>
                        <FaStar className='text-primary h-15' />
                      </div>
                      <div className=''>{data.vehicle_rating}</div>
                    </div>
                    <div className="mt-2 text-sm sm:text-lg font-bold leading-loose tracking-tight text-primary">{data.vehicle_name}</div>
                    <div className="flex items-center gap-5 my-1 text-xl font-normal leading-loose tracking-wider text-gray-400 sm:w-100px">
                      <div>{data.vehicle_transmission_type}</div>
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <div>{data.vehicle_engine_type}</div>
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <div>{data.vehicle_seat_capacity}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-solid border-gray-300 pr-4">
                    <div className='p-5'>
                      <div className="font-normal leading-6 tracking-wider text-gray-500 text-lg">{data.vehicle_status}</div>
                        <div className="text-xl font-bold leading-loose tracking-tight text-primary">₹{data.vehicle_rent}/hr</div>
                      </div>
                      <div className="flex items-center gap-4 p-2 border border-gray-500 rounded-2xl">
                        <div><CiLocationOn className="text-green-500 text-3xl" /></div>
                        <div className="text-gray-500 text-"><b>{data.vehicle_location}</b></div>
                      </div>
                    </div>
                    <div>
                         <button onClick={() => handleClick(data)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" >
                            VIEW
                         </button>
                    </div>
                  </div>
                  
                  // </NavLink>
              ))
              }
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