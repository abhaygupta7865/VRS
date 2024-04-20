import React, { useState } from 'react'
import CitySelect from './CitySelect/CitySelect'
import Cars from './Cars/Cars'
import CarView from './CarView/CarView'
import { Route, Routes } from 'react-router-dom'
import PaymentGateway from './CarView/PaymentGateway'

const CarsDash = () => {
 
  return (
    <div className="CarsDash">
      <Routes>
          <Route path="/" element={<CitySelect />}/>
          <Route path="Cars" element={<Cars />} />
          <Route path="CarView" element={<CarView />} />
          <Route path="PaymentGateway" element={<PaymentGateway />} />
      </Routes>
    </div>
  )
}

export default CarsDash
