import React from "react";
import LoginForm from "../Components/loginForm";
import { useAuth } from "../context/contextapi";

const LoginPage = () => {
  return (
    <div className="  w-full">
      <div className="  w-[95%] m-auto md:my-10 md:w-[30%] text-black border bg items-center rounded-md md:m-auto my-16 px-8 h-[400px] justify-center flex flex-col">
        <div className="items-center p-2  ">
          <h1 className="text-4xl  text-center font-mono select-none">
             Login
          </h1>
        <hr className="w-auto mx-[20px] border-2 rounded  border-blue-400 mt-3" />

    
        </div>
        <LoginForm
  
        />
      </div>
    </div>
  );
};

export default LoginPage;
