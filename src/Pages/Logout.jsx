import React ,{useEffect}from "react";
import { useAuth } from "../context/contextapi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { Logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Logout();
    navigate("/");
  }, [Logout]);
  return <div></div>;
};

export default Logout;
