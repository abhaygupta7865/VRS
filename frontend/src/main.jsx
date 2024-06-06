import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from './components/Home/Home.jsx'
import About from "./components/About/About.jsx";
import Register_Login from "./components/Register_Login/Register_Login.jsx";
import CarsDash from "./components/CarsDash/CarsDash.jsx";
import RegisterUser from "./components/Register_Login/RegisterUser.jsx";
import MyTrip from "./components/MyTrip/MyTrip.jsx";
import Customer_Account from "./components/Customer_Account/Customer_Account.jsx"
import Agent_Account from "./components/Agent_Account/Agent_Account.jsx"
import AgentCarAdd from "./components/AgentCarAdd/AgentCarAdd.jsx"
import MyRental from "./components/MyRental/MyRental.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>
      <Route  path='' element={<Home/>}/>
      <Route  path="/CarsDash/*" element={<CarsDash/>}>
      </Route>
      <Route  path="/About"  element={<About/>}/>
      <Route path="/Register_Login/*" element={<Register_Login/>}>
      </Route>
      <Route path="/RegisterUser" element={<RegisterUser/>} />
      <Route path="/MyTrip" element={<MyTrip/>} />
      <Route path="/Customer_Account" element={<Customer_Account/>}/>
      <Route path="/Agent_Account" element={<Agent_Account/>}/>
      <Route path="/AgentCarAdd" element={<AgentCarAdd/>}/>
      <Route path="/MyRental" element={<MyRental/>}/>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);