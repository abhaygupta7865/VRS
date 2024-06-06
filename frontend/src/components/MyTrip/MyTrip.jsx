import { React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import axios from 'axios';

const MyTrip = () => {
  const userDetails = useSelector((state) => state.userDetails);

  const [trips, setTrips] = useState([]);


  useEffect(() => {
    // Fetch trips data from API
    const fetchTrips = async () => {
      try {
        const response = await axios.post('http://localhost:3080/api/bookingDetails', {
          email: userDetails.customer_email, role: userDetails.role 
        }); 
        setTrips(response.data); 
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);



  return (
    <div className='container m-4'>
      <div className='h-full min-h-full overflow-auto p-2 bg-white font-sans '>
        <div className='flex justify-between max-w-7xl w-full mx-auto p-4 gap-4'>
          {/* Customer Details */}
          <div className='text-gray-700 rounded-lg border border-yellow-500 shadow-xl shadow-black text-sm w-1/4 px-4 py-8 bg-white'>
            <div className='text-center pb-2 mt-4'>
              <img src={userDetails.profile_image} alt="" className='w-20 h-20 rounded-full mx-auto mb-2 min-w-20 min-h-20' />
              <p className='text-capitalize text-lg font-bold m-0'>{userDetails.customer_name}</p>
              <p className='text-sm mb-2 mt-0 mx-0'>+91{userDetails.customer_mobile_number}</p>
              <p className='text-sm mb-2'>{userDetails.customer_email}</p>
            </div>
            <ul className='block p-2 m-0'>
              <hr />
              <li className='text-normal text-lg p-2 flex'>
                <div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Profile Document</li>
              <li className='text-normal text-lg p-2 flex'>
                <div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Mobile Number</li>
              <li className='text-normal text-lg p-2 flex'><div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Driving License</li>
            </ul>
            <hr />
          
          </div>
          
          {/* MyTrip Details */}
          <div className='rounded-lg w-3/4 mt-0 p-0 mb-0 bg-white border border-yellow-500 shadow-xl shadow-black text-sm'>
            <p className='text-center rounded-lg bg-yellow-500 text-uppercase text-3xl border-b border-yellow-500 py-4 m-0 text-white font-bold'>My Trips</p>
            <div className='h-screen min-h-screen overflow-y-auto'>
              <div className='text-sm font-sans antialiased'>
                <div className='text-center'>
                  <div className='h-screen min-h-screen overflow-y-auto'>
                    <div className='text-center'>
                      <div className='relative border w-full border-gray-300 rounded-md px-1 py-1 flex flex-col flex-grow'>
                        {trips.map((data) => (
                          <div className='card' key={data.booking_id}> {/* Assuming booking_id is unique */}
                            <div className='flex justify-between p-2 bg-gray-200 text-gray-600 text-sm font-bold tracking-tight'>
                              <div className='status'>{data.booking_status} trip</div>
                              <div className='id'>ID: {data.booking_id}</div>
                              <div className='invoice'><a href="\">Invoice</a></div>
                            </div>
                            <div className='flex flex-wrap justify-between text-base'>
                              <div className='p-2 border-r border-gray-300 flex-shrink text-center w-52'>
                                <div className='overflow-clip border-0'>
                                  <img src={data.vehicle_image} alt="" className='w-full' />
                                </div>
                                <div className='my-2 text-gray-600 text-md leading-tight font-bold'>{data.vehicle_name}</div>
                                <div className='text-gray-900 font-bold text-md'>{data.vehicle_license_Plate}</div>
                              </div>
                              <div className='w-full px-4 py-4 relative flex-1'>
                                <div className='flex justify-between'>
                                  <div className='start'>
                                    <b>START</b>: {data.booking_start_date} {data.booking_start_time}
                                  </div>
                                  <div className='divider'></div>
                                  <div className='end'><b>END</b>: {data.booking_end_date} {data.booking_end_time}</div>
                                </div>
                                <div className='max-w-full overflow-hidden flex flex-row text-left pt-4'>
                                  <span><TfiLocationPin className='text-yellow-500 text-xl'/></span>
                                  {data.booking_location}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTrip;
