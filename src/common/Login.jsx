import React from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../validations/userValidation";
import { Auth } from "../api/Auth";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminData } from "../Redux/admin/adminSlice";
import { setUserData } from "../Redux/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: (userData) => {
        Auth.login(userData)
          .then((res) => {
            toast.success(res.message);
            localStorage.setItem("Token", res.token);
            
            if (res.user.role === "admin") {
              dispatch(setAdminData({ admin: res.user }));
              navigate("/admin/jobs"); // Redirect admin to the admin jobs page
            } else {
              dispatch(setUserData({ user: res.user }));
              
              navigate("/user/jobs"); // Redirect user to the jobs page
            }
          })
          .catch((err) => {
            toast.warning(err.response?.data?.message || "Login failed");
          });
      },
    }
  );

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center p-4 dark:bg-slate-800">
      <div className="bg-white p-6 shadow-lg rounded-xl w-96 dark:bg-slate-100">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>Welcome back!</h3>
          </div>
          <div>
            <div className="capitalize text-xl mb-2">
              <label htmlFor="email">Username</label>
            </div>
            <div className="border-2 relative">
              <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </span>
              <input
                onBlur={handleBlur}
                id="email"
                name="email"
                onChange={handleChange}
                className="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                type="text"
                placeholder="Enter username"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mt-4">
            <div className="capitalize text-xl mb-2">
              <label htmlFor="password">Password</label>
            </div>
            <div className="border-2 relative">
              <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              <input
                onBlur={handleBlur}
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                type="password"
                placeholder="Enter password"
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-800 text-xl text-white font-medium uppercase p-2 rounded-lg w-full opacity-90 hover:opacity-100"
            >
              Login
            </button>
          </div>
          <div className="text-[18px] text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="capitalize text-blue-800 hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
