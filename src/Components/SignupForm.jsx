import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const { Signup, userdata } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [render, setrender] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    await Signup(data);
    setrender(true);
  };
  useEffect(() => {
    if (render) {
      (async () => {
        await userdata();
        navigate("/");
      })();
    }
  }, [render, navigate]);
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onsubmit)}
        id="paintingForm"
        className="max-w-sm mx-auto mt-8"
      >
        <div className="mb-6 ">
          <input
            autoFocus
            type="text"
            placeholder="Email or Username"
            name="username"
            {...register("username", {
              required: { value: true, message: "Enter valid username!!" },
              //   pattern: {
              //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              //     message: "Enter a valid email address.",
              //   },
            })}
            className="placeholder:text-slate-800 bg-white text-black block w-full px-4 py-2   border-2  rounded-lg focus:outline-none focus:border-blue-500 border-gray-600/40 "
          />
          {errors.username && (
            <div className="text-red-500 text-left text-xs flex py-1  ">
              <div className="mx-1 py-1">
                <CiCircleInfo />
              </div>
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="relative my-5">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required.",
            })}
            className="placeholder:text-slate-800 bg-white text-black  block w-full px-4 py-2 my-2 border-2  rounded-lg focus:outline-none focus:border-blue-500 border-gray-600/40  "
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 w-14 rounded-md right-0 text-xs  p-2 bg-blue-500 text-white"
          >
            <div className="flex justify-center items-center">
              {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </div>
          </button>
        </div>

        <button
          value="submit"
          type="submit"
          className="w-full px-4 py-3 my-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
        >
          Sign up
        </button>
      </form>
      <div className="">
        <h3 className="my-3 text-center">
          Already have an account?{" "}
          <NavLink
            className={"removeLinkHover text-blue-600 hover:text-blue-800 "}
            to="/login"
          >
            Login !
          </NavLink>{" "}
        </h3>
      </div>
    </div>
  );
};

export default SignUpForm;
