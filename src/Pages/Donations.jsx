import React from "react";
import { FaPaypal } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";


const Donations = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Support Our  Community</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto p-2">
        Your contribution helps us improve accessibility by advancing sign language recognition technology. Together, we can empower individuals, bridge communication gaps, and make a meaningful difference for the deaf and hard-of-hearing communities.
        </p>
        <hr className="w-28 mx-auto border-2 rounded border-blue-400 mt-4" />
      </div>

      {/* Donation Form */}
      <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-md">
        {/* Donation Amount */}
        <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Donation Amount</h2>
        <div className="flex md:flex-row flex-col gap-4  md:justify-around mb-6">
          <button className="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600">25$</button>
          <button className="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600">50$</button>
          <button className="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600">100$</button>
          <input
            type="text"
            placeholder="Custom"
            className="border border-gray-300 text-center md:px-4 py-3 rounded-full"
          />
        </div>

        {/* Frequency */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-2">Donation Frequency</p>
          <div className="flex justify-around">
            <button className="bg-gray-200 px-5 py-2 rounded-full hover:bg-gray-300">One-Time</button>
            <button className="bg-gray-200 px-5 py-2 rounded-full hover:bg-gray-300">Monthly</button>
          </div>
        </div>

        {/* Donor Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Payment Method */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-2">Payment Method</p>
          {/* Payment icons or fields can go here */}
          <div className="flex justify-center space-x-4">
            {/* <img src="/img/credit-card-icon.png" alt="Credit Card" className="w-12" /> */}
            <FaCreditCard size={25}/>
            {/* <img src="/img/paypal-icon.png" alt="PayPal" className="w-12" /> */}
            <FaPaypal  size={25}/>

          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-green-500 select-none text-white px-8 py-3 rounded-full hover:bg-green-600">
            Donate Now
          </button>
        </div>
      </div>

      {/* Impact Statement */}
     
    </div>
  );
};

export default Donations;
