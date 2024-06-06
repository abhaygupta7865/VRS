import React from "react";
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";

const Account = () => {
  // Retrieve user details from Redux store
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <div className='container mt-4'>
      <div className='h-full min-h-full overflow-auto p-2 font-sans bg-white'>
        <div className='flex justify-between max-w-7xl w-full mx-auto p-4 gap-4'>
          {userDetails && (
            <div key={userDetails.customer_id} className=' rounded-lg border border-yellow-500 shadow-xl shadow-black text-sm w-1/3 px-4 py-8 bg-white'>
              <div className='text-center pb-2 mt-4 text-black'>
                <img src={userDetails.profile_image} alt="" className='w-20 h-20 rounded-full mx-auto mb-2 min-w-20 min-h-20' />
                <p className='text-capitalize text-lg font-bold m-0'>{userDetails.customer_name}</p>
                <p className='text-sm mb-2 mt-0 mx-0'>+91{userDetails.customer_mobile_number}</p>
                <p className='text-sm mb-2'>{userDetails.customer_email}</p>
              </div>
              <ul className='block p-2 m-0'>
                <hr />
                <li className='text-normal text-lg p-2 flex '>
                  <div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Profile Document</li>
                <li className='text-normal text-lg p-2 flex '>
                  <div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Mobile Number</li>
                <li className='text-normal text-lg p-2 flex '><div className='m-2'><FaCheckCircle className='text-lime-600' /></div>Driving License</li>
              </ul>
              <hr />
            </div>
          )}

          {/* Account Section */}
          <div className='rounded-lg w-3/4 mt-0 p-0 mb-0 bg-white border border-yellow-500 shadow-xl shadow-black text-sm'>
            <p className='text-center rounded-lg text-uppercase text-3xl border-b border-yellow-500 py-4 text-white bg-yellow-500'>My Account</p>
            <div className='h-screen min-h-screen overflow-y-auto'>
              <div className='text-sm font-sans antialiased'>
                {/*Account details*/}
                <div className="p-4 rounded mt-4 font-sm">
                  <p className="text-lg">Account Details</p>
                  <hr className="border-yellow-300"/>
                  <div className="flex mt-2">
                    <p className="sm:w-52">Email</p>
                    <p className="sm-w-52">{userDetails && userDetails.customer_email}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="sm:w-52">Mobile*</p>
                    <input id="mobile" type="text" className="block w-52 h-8 px-3 py-2 text-base leading-tight bg-white border border-yellow-500 rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-yellow-500 hover:border-yellow-700" placeholder={userDetails && userDetails.customer_mobile_number} />
                  </div>
                </div>
                {/*Personal Details*/}
                <div className="m-4">
                  <p className="text-lg">Personal Details</p>
                  <hr className="border-yellow-300"/>
                  <div className="flex">
                    <div className="w-1/2">
                      <div className="flex mt-4">
                        <label htmlFor="" className="ml-2 ">Name*</label>
                        <label htmlFor="" className=" ml-4">{userDetails && userDetails.customer_name}</label>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex mt-4">
                        <label htmlFor="" className="mt-2 px-4">Gender</label>
                        <select name="user[gender]" id="gender" className="antialiased box-border block w-52 h-10 px-4 py-2 text-base leading-tight text-yellow5700 bg-white border border-yellow-500 rounded-md max-w-xs mr-3 hover:border-yelloe-700">
                          <option value="male" className="bg-white text-pink-700 hover:bg-pink-700">Male</option>
                          <option value="female" className="bg-white text-pink-700 hover:bg-pink-700">female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Location Details*/}
                <div className="m-4">
                  <p className="text-lg">Location Details</p>
                  <hr className="border-yellow-300"/>
                  <p className="text-xs">Please share your current city for optimized experience</p>
                  <div className="flex mt-4">
                    <label htmlFor="city" className="mt-2">City</label>
                    <select name="city" id="city" className="antialiased box-border block w-52 h-10 px-4 py-2 text-base leading-tight text-yellow-500 bg-white border border-yellow-500 rounded-md max-w-xs mr-3 hover:border-yellow-700 ml-11">
                      <option value="bhopal" className="bg-white text-pink-700 hover:bg-pink-700">Bhopal</option>
                      <option value="indore" className="bg-white text-pink-700 hover:bg-pink-700">Indore</option>
                      <option value="delhi" className="bg-white text-pink-700 hover:bg-pink-700">Delhi</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center mt-20">
                  <button className="rounded-xl bg-yellow-500 text-white p-2 w-40 text-xl hover:bg-yellow-300">UPDATE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;
