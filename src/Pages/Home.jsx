import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/contextapi";
import Footer from "../Components/Footer";

const Home = () => {
  
  const { isLogin, user, userdata } = useAuth();
  useEffect(() => {
    userdata();
  }, []);

  return (
    <>
      <div className="p-6 flex justify-center flex-col md:mx-10 my-16">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to {user.username} Sign Language to Text Translator
        </h1>
        <p className="text-xl mb-6">
          Our app helps you convert sign language gestures into readable text in
          real-time. It’s designed to bridge the communication gap and make the
          world more accessible for everyone.
        </p>

        {!isLogin ? (
          <div className="space-y-4">
            <p className="text-lg">
              Please log in or register to start translating gestures to text.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="removeLinkHover">
                <button className="bg-green-500 text-white p-2 rounded">
                  Register
                </button>
              </Link>
              <Link to="/login" className="removeLinkHover">
                <button className="bg-blue-500 text-white p-2 rounded">
                  Login
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">
              You're logged in. Ready to translate gestures?
            </p>
            <Link to="/translator" className="removeLinkHover ">
              <button className="bg-blue-500 text-white p-2 rounded my-5">
                Go to Translator
              </button>
            </Link>
          </div>
        )}
      </div>
    
      <Footer />
    </>
  );
};

export default Home;
