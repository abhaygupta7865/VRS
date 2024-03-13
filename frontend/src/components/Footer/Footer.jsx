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
    <div className="bg-gray-100 dark:bg-light mt-14 rounded-t-3xl flex flex-col items-center">  <div className="container py-4 px-4 flex justify-between">
      <div className="flex flex-col items-start">  <h1 className="text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3 gap-3 flex items-center">
          Chalo Chale
        </h1>
        <div className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Chalo Chale Car Rental. All Rights Reserved.
        </div>
        <br />
        <div className="flex items-center gap-3">
          <FaLocationArrow className="mr-2" />
          <p>Bhopal, Indore</p>
        </div>
        <div className="flex items-center gap-3">
          <FaMobileAlt className="mr-2" />
          <p>+91 6264116295</p>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <a href="#">
            <FaInstagram className="text-3xl hover:text-primary duration-300 mr-4" />
          </a>
          <a href="#">
            <FaFacebook className="text-3xl hover:text-primary duration-300 mr-4" />
          </a>
          <a href="#">
            <FaLinkedin className="text-3xl hover:text-primary duration-300" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-end mr-20 md:mr-6">  <h1 className="text-xl font-bold sm:text-left text-justify mb-3">Important Links</h1>
        <ul className="flex flex-col gap-3">
          {
            FooterLinks.map((data) => {
              return (
                <li key={data.title} className="cursor-pointer hover:text-primary duration-300">
                  <span className="px-2"></span>
                  <a href={data.link}>{data.title}</a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  </div>



  );
};

export default Footer;