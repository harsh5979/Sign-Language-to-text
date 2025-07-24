import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/contextapi";

const Navbar = () => {
  const { isLogin } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-btn')) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleContactClick = async (e) => {
    e.preventDefault();
    closeMenu();
    
    // If already on home page, just scroll to contact
    if (window.location.pathname === "/") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Navigate to home page first, then scroll
      navigate("/");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }

    setTimeout(() => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 200);
  };

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <>
      <nav
        className={`flex items-center justify-between bg-white px-4 py-3 shadow-lg transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <img src="/img/GECM_logo.png" alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
          <h1 className="text-lg md:text-2xl font-bold text-black leading-tight">
            <NavLink to="/" className="removeLinkHover hover:text-blue-900 transition-colors">
              Sign Language Recognition to Text
            </NavLink>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-900 font-bold transition-colors duration-200 ${
                isActive
                  ? "text-[#61C408] border-b-2 border-[#61C408]"
                  : "text-gray-700"
              }`
            }
          >
            HOME
          </NavLink>
          
          <NavLink
            to="/translator"
            className={({ isActive }) =>
              `hover:text-blue-900 font-bold transition-colors duration-200 ${
                isActive
                  ? "text-[#61C408] border-b-2 border-[#61C408]"
                  : "text-gray-700"
              }`
            }
          >
            TRANSLATOR
          </NavLink>

          <NavLink
            to="/donations"
            className={({ isActive }) =>
              `hover:text-blue-900 font-bold transition-colors duration-200 ${
                isActive
                  ? "text-[#61C408] border-b-2 border-[#61C408]"
                  : "text-gray-700"
              }`
            }
          >
            DONATIONS
          </NavLink>
          <NavLink
            to="/contectus"
            className={({ isActive }) =>
              `hover:text-blue-900 font-bold transition-colors duration-200 ${
                isActive
                  ? "text-[#61C408] border-b-2 border-[#61C408]"
                  : "text-gray-700"
              }`
            }
          >
            CONTACT US
          </NavLink>

        

          {/* Desktop Auth Buttons */}
          <div className="flex items-center space-x-3 ml-6">
            {isLogin ? (
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `hover:bg-gray-500 font-bold border px-3 py-2 rounded-md bg-gray-400 text-white transition-all duration-200 ${
                    isActive ? "bg-gray-600" : ""
                  }`
                }
              >
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:bg-gray-500 font-bold border px-3 py-2 rounded-md bg-gray-400 text-white transition-all duration-200 ${
                      isActive ? "bg-gray-600" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `hover:bg-gray-500 font-bold border px-3 py-2 rounded-md bg-gray-400 text-white transition-all duration-200 ${
                      isActive ? "bg-gray-600" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden hamburger-btn z-50 relative p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img
            className="w-6 h-6 invert transition-transform duration-200"
            src={menuOpen ? "/img/close.svg" : "/img/hamburger.svg"}
            alt="menu"
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#343435] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6 space-y-6">
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:text-blue-300 font-bold text-white py-2 transition-colors duration-200 ${
                isActive ? "text-[#61C408]" : ""
              }`
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/translator"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:text-blue-300 font-bold text-white py-2 transition-colors duration-200 ${
                isActive ? "text-[#61C408]" : ""
              }`
            }
          >
            TRANSLATOR
          </NavLink>

          <NavLink
            to="/donations"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:text-blue-300 font-bold text-white py-2 transition-colors duration-200 ${
                isActive ? "text-[#61C408]" : ""
              }`
            }
          >
            DONATIONS
          </NavLink>
          <NavLink
            to="/contectus"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `hover:text-blue-300 font-bold text-white py-2 transition-colors duration-200 ${
                isActive ? "text-[#61C408]" : ""
              }`
            }
          >
            CONTECTUS
          </NavLink>

          

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-4 pt-6 border-t border-gray-600">
            {isLogin ? (
              <NavLink
                to="/logout"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `hover:bg-gray-500 font-bold border px-4 py-3 rounded-md bg-gray-400 text-white text-center transition-all duration-200 ${
                    isActive ? "bg-gray-600" : ""
                  }`
                }
              >
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `hover:bg-gray-500 font-bold border px-4 py-3 rounded-md bg-gray-400 text-white text-center transition-all duration-200 ${
                      isActive ? "bg-gray-600" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `hover:bg-gray-500 font-bold border px-4 py-3 rounded-md bg-gray-400 text-white text-center transition-all duration-200 ${
                      isActive ? "bg-gray-600" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;