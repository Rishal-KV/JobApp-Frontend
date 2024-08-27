import { useFormik } from "formik";
import React from "react";
import { signupValidationSchema } from "../validations/userValidation";
import { Auth } from "../api/Auth";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupValidationSchema,
      onSubmit: (signupData) => {
        Auth.signup(signupData)
          .then((res) => {
            if (res.status) {
              toast.success(res.message);
              navigate("/");
            }
          })
          .catch((err) => {});
      },
    }
  );
  return (
    <div class="bg-gray-200 h-screen flex items-center justify-center p-4 dark:bg-slate-800">
      <div class="bg-white p-6 shadow-lg rounded-xl w-96 dark:bg-slate-100">
        <form onSubmit={handleSubmit}>
          <div class="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>welcome!</h3>
          </div>
          <div>
            <div>
              <div class="capitalize text-lg mb-2">
                <label>username</label>
              </div>
              <div class="border-2 relative">
                <span class="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
                <input
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                  type="text"
                  placeholder="enter username"
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div class="mt-2">
              <div class="capitalize text-lg mb-2">
                <label>Email</label>
              </div>
              <div class="border-2 relative">
                <span class="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="size-5"
                  >
                    <path d="M3 8l9 6 9-6" />
                    <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8l9 6 9-6z" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                  type="email"
                  placeholder="enter email"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div class="mt-2">
              <div class="capitalize text-lg mb-2">
                <label>password</label>
              </div>
              <div class="border-2 relative">
                <span class="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </span>
                <input
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                  type="password"
                  placeholder="enter password"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div class="mt-2">
              <div class="capitalize text-lg     mb-2">
                <label>confirm password</label>
              </div>
              <div class="border-2 relative">
                <span class="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </span>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  id="confirmPassword"
                  class="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                  type="password"
                  placeholder="enter password"
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <div class="sm:flex sm:justify-between inline-block my-4"></div>
            <div>
              <button
                type="submit"
                class="bg-blue-800 text-xl text-white font-medium uppercase p-2 rounded-lg w-full opacity-90 hover:opacity-100"
              >
                login
              </button>
            </div>
            <div className="text-[18px] text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link
                  to="/"
                  className="capitalize text-blue-800 hover:underline cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
