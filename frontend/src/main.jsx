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

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>
      <Route  path='' element={<Home/>}/>
      <Route  path="/CarsDash/*" element={<CarsDash/>}>
      </Route>
      <Route  path="/About"  element={<About/>}/>
      <Route path="/Register_Login/*" element={<Register_Login/>}>
      </Route>

    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);