import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const AgentDashboard = () => {
  const agentDetails = useSelector((state) => state.userDetails);
  const email = agentDetails.customer_email;
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3080/api/agentvehicles",
          { agent_email: email }
        );
        setVehicleDetails(response.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchVehicleDetails();
  }, [email]);
  console.log(vehicleDetails);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3080/api/deletevehicle", {
        data: { vehicle_id: deleteVehicleId },
      });
      setVehicleDetails((prevState) =>
        prevState.filter((vehicle) => vehicle.vehicle_id !== deleteVehicleId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleClick = () => {
    navigate("/AgentCarAdd");
  };

  const handleDeleteClick = (vehicleId) => {
    setDeleteVehicleId(vehicleId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="container mt-4">
      <div className="h-full min-h-full overflow-auto p-2 font-sans bg-white border-yellow-500">
        <div className="flex justify-between max-w-7xl w-full mx-auto p-4 gap-4">
          <div
            key={agentDetails.customer_id}
            className=" rounded-lg border border-yellow-500 shadow-xl shadow-black text-sm w-1/3 px-4 py-8 bg-white"
          >
            <div className="text-center pb-2 mt-4 text-black">
              <img
                src={agentDetails.profile_image}
                alt=""
                className="w-20 h-20 rounded-full mx-auto mb-2 min-w-20 min-h-20"
              />
              <p className="text-capitalize text-lg font-bold m-0">
                {agentDetails.customer_name}
              </p>
              <p className="text-sm mb-2 mt-0 mx-0">
                +91{agentDetails.customer_mobile_number}
              </p>
              <p className="text-sm mb-2">{agentDetails.customer_email}</p>
            </div>
            <ul className="block p-2 m-0">
              <hr />
              <li className="text-normal text-lg p-2 flex ">
                <div className="m-2">
                  <FaCheckCircle className="text-lime-600" />
                </div>
                Profile Document
              </li>
              <li className="text-normal text-lg p-2 flex ">
                <div className="m-2">
                  <FaCheckCircle className="text-lime-600" />
                </div>
                Mobile Number
              </li>
            </ul>
            <hr />
          </div>

          {/* Account Section*/}
          <div className="rounded-lg w-3/4 mt-0 p-0 mb-0 bg-white border border-yellow-500 shadow-xl shadow-black text-sm">
            <p className="text-center rounded-lg text-uppercase text-3xl border-yellow-500 py-4 text-white bg-yellow-500 font-bold text-white">
              My Car
            </p>
            <div className="h-screen min-h-screen overflow-y-auto">
              <div className="text-sm font-sans antialiased">
                <div className="text-center">
                  <div className="h-screen min-h-screen overflow-y-auto">
                    <div className="text-center">
                      {/*Card Container */}
                      {showDeleteModal && (
                        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white p-4 rounded-lg w-96">
                            <p className="text-center text-xl font-semibold mb-4">
                              Confirm Delete
                            </p>
                            <p className="text-center mb-4">
                              Are you sure you want to delete this vehicle?
                            </p>
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="relative border w-full border-gray-300 rounded-md px-1 py-1 flex flex-col flex-grow">
                        {vehicleDetails.map(
                          (data) => (
                            (
                              <div className="opacity-0 overflow-hidden hidden absolute h-full w-full top-0 left-0 z-[-10] transition duration-100 ease-out">
                                <div className="absolute h-full w-full top-0 left-0 opacity-87 bg-black z-10"></div>
                                <div className="px-4 py-4 bg-white absolute w-full bottom-0 opacity-1 transition duration-600 ease-out transform translate-y-full shadow-md">
                                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-2xl  absolute top-[-2.5rem] right-4">
                                    <i className="text-center text-2xl font-sans antialiased"></i>
                                  </div>
                                </div>
                              </div>
                            ),
                            {
                              /*Car Details*/
                            },
                            (
                              <div className="text-base font-sans antialiased text-center">
                                <div className="text-sm font-bold tracking-tight leading-4 text-center justify-between items-center  bg-white text-gray-600 antialiased font-sans">
                                  <div className="text-sm font-bold tracking-tight text-center text-gray-600 antialiased font-sans"></div>
                                  <div className="text-base m-2 relative border border-yellow-500 rounded-md">
                                    <div className="fixed top-0 left-0 h-full w-full opacity-0 overflow-hidden z-[-10] transition duration-100 ease-out"></div>
                                    <div className="card" key={data.vehicle_id}>
                                      <div className="flex justify-between p-2 bg-gray-200 text-gray-600 text-sm font-bold tracking-tight">
                                        <div className="status m-2 text-black">
                                          {data.vehicle_status}
                                        </div>
                                        <div className="id m-2 text-black">
                                          ID: {data.vehicle_id}
                                        </div>
                                        <div className="delete ">
                                          {/* <button className="rounded-md bg-yellow-500 hover:bg-yellow-300 p-2 text-white">
                                            Update
                                          </button> */}
                                          <button
                                            onClick={() =>
                                              handleDeleteClick(data.vehicle_id)
                                            }
                                            className="rounded-md bg-yellow-500 hover:bg-yellow-300 p-2 text-white"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                      {/* Body section */}
                                      <div className="flex flex-wrap justify-between text-base">
                                        {/* Car Section */}
                                        <div className="p-2 border-r border-gray-300 flex-shrink text-center w-52">
                                          <div className="overflow-clip border-0">
                                            <img
                                              src={data.vehicle_image}
                                              alt=""
                                              className="w-full"
                                            />
                                          </div>
                                          <div className="my-2 text-yellow-500 text-md leading-tight font-bold">
                                            {data.vehicle_name}
                                          </div>
                                          <div className="text-yellow-500 font-bold text-md">
                                            {data.vehicle_license_plate}
                                          </div>
                                        </div>
                                        <div className="w-full px-4 py-4 relative flex-1">
                                          <div className="text-sm text-gray-700 text-left">
                                            <div className="company_Name">
                                              <b>Company Name :</b>{" "}
                                              {data.vehicle_model}
                                            </div>
                                            <div className="engine_type">
                                              <b>Engine Type :</b>{" "}
                                              {data.vehicle_engine_type}
                                            </div>
                                            <div className="transmission_Type">
                                              <b>Transmission Type :</b>{" "}
                                              {data.vehicle_transmisson_type}
                                            </div>
                                            <div className="seat_capacity">
                                              <b>Seat Capacity :</b>{" "}
                                              {data.vehicle_seat_capacity}
                                            </div>
                                            <div className="flex justify-start">
                                              <div className="rating">
                                                <b>Rating :</b>{" "}
                                                {data.vehicle_rating}
                                              </div>
                                              <FaStar className="text-yellow-300 m-1" />
                                            </div>
                                          </div>
                                          <div className="flex justify-between">
                                            <div className="text-sm text-yellow-500">
                                              {data.vehicle_location},{" "}
                                              {data.vehicle_city},{" "}
                                              {data.vehicle_state}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                        <div className="flex justify-center m-4">
                          <button
                            onClick={handleClick}
                            className="rounded-xl bg-yellow-500 text-white p-2 w-40 text-xl hover:bg-yellow-300"
                          >
                            Add Vehicle
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
    </div>
  );
};

export default AgentDashboard;
