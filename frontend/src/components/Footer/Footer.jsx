import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa';

const FooterLinks = [
  {
    id:"1",
    title: "About Us",
    link: "/About",
  },
  {
    id:"2",
    title: "Location",
    link: "/Location",
  },
  {
    id:"3",
    title: "Blogs",
    link: "/Blogs",
  },
  {
    id:"4",
    title: "FAQs",
    link: "/FAQs",
  },
  {
    id:"5",
    title: "Terms and Conditions",
    link: "/Terms",
  },
  {
    id:"6",
    title: "Privary Policy",
    link: "/Privary",
  },

]
const Footer = () => {
  return (
    <div className='bg-gray-100 dark:bg-light mt-14 rounded-t-3xl'>
      <div className='container'>
        <div className='grid md:grid-cols-3 p-5'>
          {/* Company details */}
          <div className='py-8 px-4'>
            <h1 className='text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3 gap-3 flex items-center'>
              Chalo Chale
            </h1>
            <div className="text-sm">
              Copyright &copy; {new Date().getFullYear()} Chalo Chale Car Rental. All Rights Reserved.
            </div>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Bhopal, Indore</p>
            </div>
            <div className="flex items-center gap-3">
              <FaMobileAlt />
              <p>+91 6264116295</p>
            </div>
            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a><a href="#">
                <FaLinkedin className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>
          {/* NavLinks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-6">
                <h1 className="text-xl font-bold sm:text-left text-justify mb-3">Important Links</h1>
                <ul className="flex flex-col gap-3">
                  {
                    FooterLinks.map((data) => {
                      return (
                        <li key={data.title}
                          className="cursor-pointer hover:text-primary duration-300">
                          <span className="px-2"></span>
                          <a href={data.link}>{data.title}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Footer;