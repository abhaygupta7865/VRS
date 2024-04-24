import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa";
import { MdViewHeadline } from "react-icons/md";
import { FaStarHalfAlt } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { FaRegRectangleList } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const CarViewEdit = () => {
  const loggedIn= useSelector(state=> state.loggedIn)
  const carData= useSelector(state=> state.carData)
  const bookingStartTimeStamp= useSelector(state=> state.bookingStartTimeStamp)
  const bookingEndTimeStamp= useSelector (state=> state.bookingEndTimeStamp)
  const navigate= useNavigate();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;
  };

  const calculateHoursDifference = (startTimeStamp, endTimeStamp) => {
    const startDate = new Date(startTimeStamp);
    const endDate = new Date(endTimeStamp);
    
    const timeDifference = endDate.getTime() - startDate.getTime(); 
    const hoursDifference = timeDifference / (1000 * 60 * 60); 
    
    return Math.round(hoursDifference); 
  };

  const formattedBookingStartTime = formatTimestamp(bookingStartTimeStamp);
  const formattedBookingEndTime = formatTimestamp(bookingEndTimeStamp);
  const hoursDifference = calculateHoursDifference(bookingStartTimeStamp, bookingEndTimeStamp);
  
  const handleClick = ()=>{
      if(loggedIn){
      navigate("/CarsDash/PaymentGateway")
      }
      else {
        navigate("/Register_Login/Login");
      }
  }
  return (
    <div className="w-full h-screen">
      {/*Page-Car-Details*/}
        <div className="font-sans font-normal text-base antialiased bg-gray-100 box-border max-h-screen flex flex-row p-4 md:p-8 h-full min-h-full overflow-auto">
          <div>
            {/*Back-btn*/}
            <div className="font-sans font-normal text-base antialiased flex items-center gap-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-8 cursor-pointer">
                <IoIosArrowBack />
                <span>Back</span>
              </div>
            </div>
            {/*Details-of-car*/}
            <div className="font-sans font-normal text-base antialiased bg-white box-border block flex-shrink-0 flex-grow">
              <div className="font-sans font-normal text-base antialiased bg-gray-100 box-border flex flex-row gap-2 justify-between h-full min-h-full overflow-auto">
                {/*Left Section */}
                <div className="font-normal text-base antialiased font-sans box-border max-w-70 flex flex-col gap-5 mr-10">
                  {/* left-Image */}
                  <div className="rounded-lg shadow-md">
                    <div className="relative w-full overflow-hidden rounded-md border border-gray-300">
                      <div className="flex justify-center bg-white w-full h-96 cursor-pointer">
                        <img src={carData.vehicle_image} alt="" 
                        className="w-4/5 h-auto object-cover rounded-lg mb-4"/>
                      </div>
                    </div>
                  </div>
                  {/* From-TO Details */}
                  <section className="font-sans text-base antialiased bg-white py-4 px-6">
                    <div className="grid grid-row-6-4">
                      <div className="grid grid-row-repeat(2, 1fr)">
                        {/* Contain-Form-Detials */}
                        <div className="From">
                          <div className="font-bold leading-tight text-gray-900">From</div>
                          <div className=" leading-relaxed text-gray-900 mt-2">{formattedBookingStartTime}</div>
                          <div className="text-sm text-gray-400 leading-normal">Habibganj Railway station gate no 1, Habib Ganj, Bhopal, Madhya Pradesh 462016, India</div>
                        </div>
                        {/* Contain-to-Details */}
                        <div className="font-sans text-base antialiased">
                          <div className="font-sans text-base font-bold leading-tight text-gray-900">To</div>
                          <div className="font-sans text-base leading-relaxed text-gray-900 mt-2">{formattedBookingEndTime}</div>
                          <div className="text-sm text-gray-400 leading-normal">
                            Habibganj Railway station gate no 1, Habib Ganj, Bhopal, Madhya Pradesh 462016, India
                          </div>

                        </div>
                      </div>
                    </div>
                  </section>
                  {/* Car-Specification */}
                  <div className="font-sans text-base antialiased shadow-md rounded-lg bg-white p-4">
                    <div>
                      <div className="font-sans text-base antialiased">
                        <div className="flex justify-between border-b border-gray-300 flex-row">
                          <div>
                            {/* Car-Info */}
                            <div className="w-full order-1 pb-6">
                              {/* Car-Name */}
                              <span className="font-sans text-xl font-bold leading-tight text-gray-900 tracking-tight">{carData.vehicle_name}</span>
                              {/* Car-Accessories */}
                              <div className="flex">
                                <span className="font-sans text-sm leading-4 text-gray-400 mr-1">{carData.vehicle_transmission_type}</span>
                                <span className="h-1 w-1 bg-gray-400 rounded-full mr-1 mt-2"></span>
                                <span className="font-sans text-sm leading-4 text-gray-400 mr-1">{carData.vehicle_engine_type}</span>
                                <span className="h-1 w-1 bg-gray-400 rounded-full mr-1 mt-2"></span>
                                <span className="font-sans text-sm leading-4 text-gray-400 mr-1">{carData.vehicle_seat_capacity} Seats</span>
                              </div>
                              {/* Car-Rating */}
                              <div className="flex items-center py-2 w-full order-3">
                                <div className="">
                                  <FaStar className="text-yellow-500" />
                                </div>
                                <div className="font-sans text-sm leading-4 text-gray-500 underline cursor-pointer ml-1 hover:text-gray-700">{carData.vehicle_rating} (35)</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Car-Bookink-Timing */}
                        <div>
                          <div className="pt-4">
                            <div className="pb-4">
                              <div className="flex justify-between items-baseline">
                                <div className="text-lg font-bold leading-tight text-gray-900 tracking-tight">Booking Time</div>
                                <div className="text-sm leading-4 text-pink-700 cursor-pointer flex gap-2">
                                  <span className="text-sm leading-4 text-pink-700 cursor-pointer">Modify</span>
                                  <span><SlCalender className="text-pink-700" /></span>
                                </div>
                              </div>
                              <div className="relative mt-6 flex justify-between rounded-lg shadow-md px-4 py-3">
                                {/* Booking-Left */}
                                <div className="w-1/4">
                                  <div className="text-sm leading-4 text-gray-400 pb-2">Pickup</div>
                                  <div className="text-sm leading-4 text-gray-900">{formattedBookingStartTime}</div>
                                </div>
                                {/* Booking-Mid */}
                                <div className="font-sans text-base antialiased">
                                  <div className="font-sans text-sm leading-4 text-gray-400 pb-2 border-b-25 border-b-gray-200 absolute top-0 left-1/2 transform -translate-x-1/2 h-0 w-44">
                                    <div className="leading-4 text-gray-400 absolute top-[-20px] ml-20">{hoursDifference}</div>
                                  </div>
                                  <div>
                                    <FaArrowRight className="text-gray-400 relative top-8" />
                                  </div>
                                </div>
                                {/* Booking-Right */}
                                <div className="text-right w-1/4">
                                  <div className="text-sm leading-4 text-gray-400 text-right pb-2">Drop</div>
                                  <div className="text-sm leading-4 text-gray-900 text-right">{formattedBookingEndTime}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Car-Rating-Review */}
                        <div>
                          <div className="font-sans text-base antialiased mt-8">
                            {/* Header-Container */}
                            <div className="pb-4 border-b border-gray-300">
                              {/* Header */}
                              <div className="flex justify-between items-baseline">
                                <div className="text-lg font-bold leading-6 tracking-tight text-gray-900">Ratings & Reviews</div>
                                <div className="cursor-pointer flex gap-2 font-sans text-sm leading-4 text-pink-700">
                                  <span className="text-sm leading-4 text-pink-700">View All</span>
                                  <MdViewHeadline className="text-lg" />
                                </div>
                              </div>
                              {/* SubHeader */}
                              <div className="flex items-center gap-3 ml-[-3px] text-sm leading-4 text-gray-900 font-sans">
                                <FaStar className="text-yellow-500" />
                                <span>{carData.vehicle_rating} (25 Reviews)</span>
                                <FaStar />
                              </div>
                            </div>
                            {/* Rating-List */}
                            <div className="flex flex-col gap-5 border-b border-gray-300 pb-4 pt-4 font-sans text-base antialiased mt-4">
                              <div className="w-72 font-sans text-base antialiased">
                                {/* Rating-list */}
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Value for Money
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>4.9</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStarHalfAlt />
                                    </div>
                                  </div>

                                </div>
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Value for Money
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>4.9</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStarHalfAlt />
                                    </div>
                                  </div>

                                </div>
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Cleanliness
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>4.8</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStarHalfAlt />
                                    </div>
                                  </div>

                                </div>
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Pickup & Dropoff experience
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>5</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                    </div>
                                  </div>

                                </div>
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Drivability
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>5</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                    </div>
                                  </div>

                                </div>
                                <div className="flex justify-between text-sm">
                                  <div className="text-sm font-sans antialiased">
                                    Host Responsiveness
                                  </div>
                                  <div className="flex items-center gap-4 font-sans text-sm antialiased">
                                    <div>4.8</div>
                                    <div className="flex justify-start text-yellow-500 ml-[-2]">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStarHalfAlt />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            {/* Cancellation-Policy */}
                            <div className="pt-2">
                              {/* Header */}
                              <div className="pb-2">
                                <div className="flex justify-between">
                                  <div className="text-lg font-bold leading-6 tracking-tight text-gray-900 font-sans">
                                    Cancellation Policy
                                  </div>
                                  <div className="cursor-pointer flex items-center gap-2 text-sm leading-4 text-pink-700 font-sans antialiased">
                                    <span className="cursor-pointer text-sm leading-4 text-pink-700 font-sans antialiased">Know More</span>
                                    <RiPagesLine className="text-pink-700 text-lg" />
                                  </div>
                                </div>
                              </div>
                              {/* Cannellation-Data */}
                              <div className="text-base pl-2 font-sans antialiased relative">
                                <div className="text-md font-semibold leading-6 tracking-tight text-gray-900 font-sans antialiased">
                                Free Cancellation
                                </div>
                                <div className="text-sm leading-4 text-gray-400 font-sans antialiased pb-1">
                                Change of plans? No problem! Enjoy a FULL REFUND on cancellation before
                                </div>
                                <div className="text-sm pb-1 font-sans antialiased">
                                {formattedBookingStartTime}
                                </div>
                                <div className="text-sm leading-4 text-gray-400 font-sans antialiased pb-1">Quick refund after cancellation</div>
                              </div>
                              {/* Agreement-Policy */}
                              <div className="font-normal text-base antialiased font-sans box-border mt-5 flex justify-between">
                                <div className="box-border relative">
                                  <div className="font-bold leading-6 tracking-tight text-gray-800 text-lg">
                                  Agreement Policy
                                  </div>
                                  <div className="text-sm leading-4 tracking-wide text-gray-400">
                                  I hereby agree to the terms and conditions of the Lease Agreement with Host
                                  </div>
                                  <div className="font-normal text-base antialiased font-sans box-border text-green-500">
                                    <a href="" target="_blank">See Details</a>
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
                {/* Right Section */}
                <div className="font-normal text-base antialiased font-sans box-border rounded-lg absolute left-70vw top-90px shadow-md max-w-3/10 w-80 bg-white flex-1 -mr-5">
                  <div className="summary">
                    <div className="wallet">
                      <div className="font-semibold antialiased box-border font-sans text-base leading-6 tracking-tight text-white p-2 text-center bg-pink-700 rounded-md">
                      Wallet
                      </div>
                      {/* <div className="Copoun font-normal text-base antialiased font-sans box-border flex justify-between pt-5 pb-5 pr-4 pl-4 cursor-pointer">
                        <div className="cursor-pointer box-border flex gap-4 flex-1">
                        <RiCoupon3Line />
                        <div>
                          <a href="/">Apply Coupon</a>
                        </div>
                        <IoIosArrowForward />
                        </div>
                      </div> */}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between p-2">
                        <div className="text-sm">Trip Amount (this does not include fuel)</div>
                        <div className="text-sm">{carData.vehicle_rent}</div>
                      </div>
                      <hr  className="border-pink-700 mx-2"/>
                      <div className="flex justify-between p-2">
                        <div className="text-sm">Trip Protection Fee</div>
                        <div className="text-sm">+ ₹129</div>
                      </div>
                      <hr  className="border-pink-700 mx-2"/>
                      <div className="flex justify-between p-2">
                        <div className="text-sm">Convenience Fee</div>
                        <div className="text-sm">+ ₹99</div>
                      </div>
                      <hr  className="border-pink-700 mx-2"/>
                      <div className="flex justify-between p-2">
                        <div className="text-sm">Total Price</div>
                        <div className="text-sm">₹{carData.vehicle_rent + 129 + 99}</div>
                      </div>
                      <hr  className="border-pink-700 mx-2"/>
                    </div>
                    {/* Ammount */}
                    <div className="summary-ammount font-normal text-base antialiased font-sans box-border mt-30 shadow-lg w-full p-15 rounded-bl-12 rounded-br-12 p-4">
                      <div className="text-xs mb-2">
                      Please review final amount
                      </div>
                      <div className="flex justify-between">
                        <div className="summary-amount-inner-left">
                          <div className="font-semibold antialiased font-sans box-border text-xl">
                          ₹{carData.vehicle_rent + 129 + 99}
                          </div>
                        </div>
                        <div className="font-normal text-base antialiased font-sans box-border flex items-center cursor-pointer">
                        <FaRegRectangleList />
                        <span>Fare Summary</span>
                        </div>
                      </div>
                      {/* Payment-button */}
                      <div className="font-normal text-base antialiased font-sans box-border">
                        <div className="font-normal text-base antialiased font-sans box-border">
                          <button onClick={handleClick}className="font-semibold text-base antialiased font-sans box-border cursor-pointer flex justify-center items-center h-12 max-w-xs md:max-w-lg mb-4 md:mb-0 mx-auto border-none rounded-md bg-pink-700 w-52 text-white uppercase shadow-md mt-3 md:mt-15">
                            <span>Proceed to Pay</span>
                          </button>
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

export default CarViewEdit;