import CarView from './CarView'
// import PaymentGateway from './PaymentGateway'
import { Route, Routes } from 'react-router-dom'

const CarView_Payment = ({ CarData }) => {
  return (
    <div className="CarView_Payment">
      <Routes>
          <Route path="/" element={<CarView  CarData={CarData}/>} />
          {/* <Route path="/PaymentGateway" element={<PaymentGateway/>} /> */}
      </Routes>
    </div>
  )
}

export default CarView_Payment
