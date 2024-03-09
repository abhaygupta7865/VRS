import React, { useState } from 'react'
import CitySelect from './CitySelect/CitySelect'
import Cars from './Cars/Cars'
import { Route, Routes } from 'react-router-dom'

const CarsDash = () => {
  const [location, setLocation] = useState('')
  return (
    <div className="CarsDash">
      <Routes>
          <Route path="/" element={<CitySelect setLocation={setLocation} />}/>
          <Route path="Cars" element={<Cars location={location} />} />
      </Routes>
    </div>
  )
}

export default CarsDash
