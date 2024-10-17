import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import axios from "axios";

export const AuthContext = createContext();

export const MycontextProvide = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  

  const isLogin = !!token;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const Logout = () => {
    setToken("");
    setUser("");
    setUserType("");
    toast.success("Logged out");
    localStorage.removeItem("token");
  };

  const userdata = async () => {
    try {
      const response = await fetch(`${url}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Make sure the token is valid
        },
      });
  
      if (response.ok) {
        const r = await response.json();
  
        // Set user details and wallet balance, using optional chaining and fallback values
        setUser(r.user || {});
      
  
        // Set user type based on admin status
        setUserType(r.usertype);
       
        
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  

  const Signup = async (data) => {
    try {
      const r = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await r.json();
      if (r.ok) {
        storeToken(res.authtoken);
        setUserType(res.isAdmin ? "admin" : "user");
        userdata();
        toast.success(res.message);
      } else {
        toast.error(res.error ? res.error : res);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const Login = async (data) => {
    try {
      const r = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await r.json();
      if (r.ok) {
        storeToken(res.authtoken);
        setUserType(res.usertype);
        userdata();
        toast.success(res.message);
        return res.status(200).json({massage :"done"})
      } else {
        toast.error(res.error ? res.error : res);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };









  return (
    <AuthContext.Provider
      value={{
        url,
        isLogin,
        userType,
        userdata,
        user,
        Login,
        Signup,
        token,
        storeToken,
        Logout,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
