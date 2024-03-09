import React from "react";

const TestimonialsData = [
  {
    name: "Satya",
    image: "",
    description: "The entire process, from booking to returning the car, was seamless and hassle-free. The car was clean and in excellent condition, and the staff was incredibly friendly and helpful. I highly recommend Chalo Chale Car Rental!",
    aosDelay:"300",
  },
  {
    name: "Sabir",
    image: "",
    description: "I was very impressed with the variety of vehicles available and the competitive rates offered by Chalo Chale. The staff went above and beyond to ensure I had a positive experience, and I will definitely be returning for my next car rental needs.",
    aosDelay:"1000",
  },
  {
    name: "Satwik",
    image: "",
    description: "Chalo Chale Car Rental made my road trip unforgettable. The car was reliable and fuel-efficient, and the customer service was outstanding. I'm grateful for their professionalism and will be recommending them to my friends and family.",
    aosDelay:"1500",
  },
]

const Testiomonial = () => {
  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container">
          {/* {Header} */}
          <div className="space-y-4 pb-12">
            <p 
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Happy Customers Say About Us
            </p>
            <p data-aos="fade-up"
            className="text-center sm:px-4"
            >
              At Chalo Chale Car Rental, we're committed to providing our customers with exceptional service and a smooth car rental experience.
            </p>
          </div>
          {/* card section */}
          <div className="grid griod-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-black dark:text-white">
            {
              TestimonialsData.map((data) => {
                return (
                  <div data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  key={data.name}
                  className="card text-center group space-y-3 sm:space-y-6 p-4 bg-gray-100 dark:bg-white/20 sm:py-12 duration-300 rounded -lg"
                  >
                    <div className="grid place-items-center">
                      <img 
                      className="h-20 w-20 rounded-full"
                      src="https://picsum.photos/200" alt=" " 
                      />
                    </div>
                    <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                    <p>{data.description}</p>
                    <p className="font-semibold text-center">{data.name}</p>
                  </div>
                )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default Testiomonial;