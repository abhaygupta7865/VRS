import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
// import CarPng from '../../assets/Ford Ecosport MT Diesel.png';
// import Car1 from '../../assets/MahindraMazaro.png';
// import ProfilePic from '../../assets/SatwikPic.jpg';

const CustomerDeatils = [
  {
    customerID: "001",
    customerName: "Satwik Baghel",
    customerEmail: "satwikbaghel8899@gmail.com",
    customerMobileNo: "6264116295",
    //customerProfilePic: ProfilePic 
  }
]
const MyTripDetails = [
  {
    customerID: "001",
    MyTripId: "JPS69T1NP",
    name: "Ford Ecosport MT Diesel",
    registerNo: "MP04CV8899",
    // image: CarPng,
    DateofStartTrip: "15 Feb",
    DateofEndTrip: "15 Feb",
    startTime: "11:00 AM",
    endTime: "11:30 PM",
    location: "SBI Shakti Nagar Branch",
    city: "Bhopal",
    tripStatus: "COMPLETED",
  },
  {
    customerID: "001",
    MyTripId: "JPS69T1NG",
    name: "Mahindra Mazaro",
    registerNo: "MP04CV3099",
    // image: Car1,
    DateofStartTrip: "18 Feb",
    DateofEndTrip: "18 Feb",
    startTime: "11:00 AM",
    endTime: "11:30 PM",
    location: "SBI Shakti Nagar Branch",
    city: "Bhopal",
    tripStatus: "COMPLETED",
  }
]

const MyTrip = () => {
  const navigate = useNavigate();
  return (
    <div className='container m-4'>
      <div className='h-full min-h-full overflow-auto p-2 bg-gray-200 font-sans '>
        <div className='flex justify-between max-w-7xl w-full mx-auto p-4 gap-4'>
          {CustomerDeatils.map((data) => (
            <div key={data.customerID} className='text-gray-700 rounded-md border border-gray-300 shadow shadow-gray-300 text-sm w-1/4 px-4 py-8 bg-white'>
              <div className='text-center pb-2 mt-4'>
                <img src={data.customerProfilePic} alt="" className='w-20 h-20 rounded-full mx-auto mb-2 min-w-20 min-h-20' />
                <p className='text-capitalize text-lg font-bold m-0'>{data.customerName}</p>
                <p className='text-sm mb-2 mt-0 mx-0'>+91{data.customerMobileNo}</p>
                <p className='text-sm mb-2'>{data.customerEmail}</p>
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
              <ul>
                <li>
                  <div className='transition duration-200 ease-in-out bg-gradient-to-r from-white to-yellow-300 flex items-center py-4 border-b border-gray-300 cursor-pointer'>
                    <div className='bg-yellow-500 w-2 h-2 rounded-full'>
                    </div>
                    <a href="" className='ml-6 text-lg text-yellow-500 font-bold'>My MyTrip</a>
                  </div></li>
                <li>
                  <div className='flex items-center py-4 border-b border-gray-300 cursor-pointer'>
                    <div className='w-2 h-2 rounded-full'></div>
                    <a href="/" className='ml-6 text-lg text-yellow-500 font-bold'>Saved Card</a>
                  </div>
                </li>
                <li>
                  <div className='flex items-center py-4 border-b border-gray-300 cursor-pointer'>
                    <div className='w-2 h-2 rounded-full'></div>
                    <a href="/" className='ml-6 text-lg text-yellow-500 font-bold'>Account</a>
                  </div>
                </li>
              </ul>
            </div>
          ))}
          {/* MyTrip Details */}
          <div className='rounded-md w-3/4 mt-0 p-0 mb-0 bg-white border border-gray-300 shadow shadow-gray-300 text-sm'>
            <p className='text-center text-uppercase text-3xl border-b border-gray-300 py-4 m-0'>My MyTrip</p>
            <div className='h-screen min-h-screen overflow-y-auto'>
              <div className='text-sm font-sans antialiased'>
                <div className='text-center'>
                  <div className='h-screen min-h-screen overflow-y-auto'>
                    <div className='text-center'>
                      {/*Card Container */}
                      <div className='relative border w-full border-gray-300 rounded-md px-1 py-1 flex flex-col flex-grow'>
                        {MyTripDetails.map((data) => (
                          <div className='opacity-0 overflow-hidden hidden absolute h-full w-full top-0 left-0 z-[-10] transition duration-100 ease-out'>
                            <div className='absolute h-full w-full top-0 left-0 opacity-87 bg-black z-10'></div>
                            <div className='px-4 py-4 bg-white absolute w-full bottom-0 opacity-1 transition duration-600 ease-out transform translate-y-full shadow-md'>
                              <div className='h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-2xl  absolute top-[-2.5rem] right-4'>
                                <i className='text-center text-2xl font-sans antialiased'></i>
                              </div>
                            </div>
                          </div>
                          ,{/*Car Details*/ },
                          <div className='text-base font-sans antialiased text-center'>
                            <div className='text-sm font-bold tracking-tight leading-4 text-center justify-between items-center  bg-white text-gray-600 antialiased font-sans'>
                              <div className='text-sm font-bold tracking-tight text-center text-gray-600 antialiased font-sans'></div>
                              <div className='text-base m-2 relative border border-gray-300 rounded-md'>
                                <div className='fixed top-0 left-0 h-full w-full opacity-0 overflow-hidden z-[-10] transition duration-100 ease-out'>
                                </div>
                                <div className='card' key={data.MyTripId}>
                                  <div className='flex justify-between p-2 bg-gray-200 text-gray-600 text-sm font-bold tracking-tight'>
                                    <div className='status'>{data.tripStatus} TRIP</div>
                                    <div className='id'>ID: {data.MyTripId}</div>
                                    <div className='invoice'><a href="\">Invoice</a></div>
                                  </div>
                                  {/* Body section */}
                                    <div className='flex flex-wrap justify-between text-base'>
                                      {/* Car Section */}
                                      <div className='p-2 border-r border-gray-300 flex-shrink text-center w-52'>
                                        <div className='overflow-clip border-0'>
                                          <img src={data.image} alt="" className='w-full' />
                                        </div>
                                        <div className='my-2 text-gray-600 text-md leading-tight font-bold'>{data.name}</div>
                                        <div className='text-gray-900 font-bold text-md'>{data.registerNo}</div>
                                      </div>
                                      {/* Journey Section */}
                                      <div className='w-full px-4 py-4 relative flex-1'>
                                        <div className='flex justify-between'>
                                          <div className='start'>
                                            <b>START</b>: {data.DateofStartTrip}, {data.startTime}
                                          </div>
                                          <div class='divider'></div>
                                          <div className='end'><b>END</b>: {data.DateofEndTrip}, {data.endTime}</div>
                                        </div>
                                        <div className='max-w-full overflow-hidden flex flex-row text-left pt-4'>
                                        <span><TfiLocationPin className='text-lime-500 text-xl'/></span>
                                        {data.location}
                                        </div>
                                      </div>
                                    </div>
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