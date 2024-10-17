import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div id="service  " className="bg-black">
      <footer className="bg  text-white py-9">
        <div className="container mx-auto flex justify-between flex-wrap p-4">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-green-400 font-bold mb-4">Contact Us</h4>
            <p>
              <strong>Address:</strong> Shamlaji Rd, Modasa, Gujarat 383315
            </p>
            <p>
              <strong>Contact No.:</strong> 909961XXXX
            </p>
            <p>
              <strong>Mail:</strong> info@gecmess.ac.in
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="#"
                className="RLH text-green-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="RLH text-green-400 hover:text-white"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="#"
                className="RLH text-green-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="RLH text-green-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          <div id="footerLinks" className="w-full md:w-1/4 mb-6 md:mb-0 ">
            <h4 className="text-green-400 font-bold mb-4">For Students</h4>
            <ul className="my-2 text-white">
              <li>
                <NavLink
                  to={"/NewsandEvents"}
                  className="hover:underline RLH removeLinkHover text-white"
                  
                >
                   News and Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/alumini"}
                  className="hover:underline RLH removeLinkHover text-white"
                  
                >
                   Archivements
                </NavLink>
              </li>
              <li>
                <a
                  href={"https://www.gecmodasa.ac.in/"}
                  className="hover:underline RLH removeLinkHover text-white"
                  
                >
                College Website
                </a>
              </li>
         
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-green-400 font-bold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="https://gtu.ac.in/" className="hover:underline RLH text-white removeLinkHover">
                  GTU
                </a>
              </li>
              <li>
                <a href="https://acpc.gujarat.gov.in/" className="hover:underline RLH text-white removeLinkHover">
                  ACPC 
                </a>
              </li>
              <li>
                <a href="https://gecmodasa.ac.in/enewsletter.php" className="hover:underline RLH  text-white removeLinkHover">
                News Letter
                </a>
              </li>
              <li>
                <a href="https://gecmodasa.ac.in/informationbrochure.php" className="hover:underline text-white RLH removeLinkHover">
                Information Brochure
                </a>
              </li>
           
           
            </ul>
          </div>
 
        </div>
        <div className="mt-10 text-center text-gray-400">
          <p>
            2024©Alumni Association Modasa | All rights reserved.
          </p>
          {/* <p>Visitor Count:</p> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
