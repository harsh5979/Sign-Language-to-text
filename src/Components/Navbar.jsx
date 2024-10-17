import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/contextapi";

const Navbar = () => {
  const { isLogin } = useAuth();
  const [isSticky, setisSticky] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setisSticky(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContactClick = async (e) => {
    e.preventDefault();
    navigate("/");

    setTimeout(() => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 200);
  };
  return (
    <nav
    onClick={toggleMenu}

      className={`flex items-center justify-between bg-white/40 p-4 shadow-lg   z-50 ${
        isSticky ? "sticky top-0 z-10 bg-gray-300" : ""
      }`}
    >
      {/* Logo */}

      <div className="flex items-center space-x-4">
        <img src="/img/GECM_logo.png" alt="Logo" className="w-16 h-16" />
        <h1 className="md:text-2xl text-xl font-bold text-black">
          <NavLink to={"/"} className={"removeLinkHover"}>
          Sign Language Recognition to Text
          </NavLink>
        </h1>
      </div>

      {/* Links */}
      <nav
        className={`humbar md:gap-7 md:justify-center fixed  z-30 top-[12vh]   md:top-0 right-0 h-full    transform ${
          menuOpen
            ? "translate-x-0 flex flex-col md:flex-row md:bg-transparent bg-[#343435] p-5 gap-6"
            : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:transform-none md:flex md:items-center`}
      >
        <NavLink
          to="/"
          onClick={toggleMenu}

          className={(e) =>
            `hover:text-blue-900 font-bold  ${
              e.isActive
                ? "text-[#61C408] after:w-[100%] after:bg-[#73a6e1]"
                : ""
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/translator"
          onClick={toggleMenu}

          className={(e) =>
            `hover:text-blue-900 font-bold  ${
              e.isActive
                ? "text-[#61C408] after:w-[100%] after:bg-[#73a6e1]"
                : ""
            }`
          }
        >
          <div >
           TRANSLATOR
          </div>
        </NavLink>

        <NavLink
          to="/donations"
          onClick={toggleMenu}

          className={(e) =>
            `hover:text-blue-900 font-bold  ${
              e.isActive
                ? "text-[#61C408] after:w-[100%] after:bg-[#73a6e1]"
                : ""
            }`
          }
        >
          DONATIONS
        </NavLink>
       
        <NavLink
          to="/contactus"
          onClick={toggleMenu}

          className={(e) =>
            `hover:text-blue-900 font-bold  ${
              e.isActive
                ? "text-[#61C408] after:w-[100%] after:bg-[#73a6e1]"
                : ""
            }`
          }
        >
          <div className=" cursor-pointer" onClick={handleContactClick}>
            CONTACT US
          </div>
        </NavLink>

        {/* Login/Signup */}
        <div className="flex gap-5 ml-10  ">
          {isLogin ? (
            <NavLink
              to="/logout"
            onClick={toggleMenu}

              className={(e) =>
                `hover:text-blue-900 font-bold  border p-2 px-3 removeLinkHover rounded-md bg-gray-400 ${
                  e.isActive
                    ? "text-white  after:bg-[#73a6e1] "
                    : ""
                }`
              }
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
            onClick={toggleMenu}

                className={(e) =>
                  `hover:text-blue-900 font-bold  border p-2 removeLinkHover rounded-md bg-gray-400 ${
                    e.isActive
                      ? "text-white  after:bg-[#73a6e1] "
                      : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
            onClick={toggleMenu}

                className={(e) =>
                  `hover:text-blue-900 font-bold border p-2 removeLinkHover rounded-md bg-gray-400 ${
                    e.isActive
                      ? "text-white  after:bg-[#73a6e1] "
                      : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <div className="md:hidden mx-2 ">
          <img
            className="invert  cursor-pointer mx-1 m-auto flex"
            src={menuOpen ? "/img/close.svg" : "/img/hamburger.svg"}
            onClick={toggleMenu}
            alt="menu"
          />
        </div>
    </nav>
  );
};

export default Navbar;
