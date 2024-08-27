import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminApi } from "../../api/adminApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const JobPostForm = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const admin = useSelector((state) => state.admin.adminData.admin);
  const fetchLocationSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      setSuggestions(response.data.features);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      creatorId: "" || admin._id,
      companyName: "",
      position: "",
      contract: "",
      location: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company name is required"),
      position: Yup.string().required("Position is required"),
      contract: Yup.string().required("Contract type is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      formik.setFieldValue("creatorId", admin._id);
      adminApi.postJob(values).then((res) => {
        toast.success(res.message);
        navigate("/admin/jobs");
      });
    },
  });

  const handleLocationChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("location", value);

    if (value) {
      fetchLocationSuggestions(value);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl  text-black font-bold mb-6">Post a Job</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enter company name"
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.companyName && formik.errors.companyName
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.companyName}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Enter job position"
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.position && formik.errors.position
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.position && formik.errors.position ? (
            <div className="text-red-500 text-sm">{formik.errors.position}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contract"
            className="block text-sm font-medium text-gray-700"
          >
            Contract
          </label>
          <select
            id="contract"
            name="contract"
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.contract && formik.errors.contract
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={formik.values.contract}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select contract type
            </option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          {formik.touched.contract && formik.errors.contract ? (
            <div className="text-red-500 text-sm">{formik.errors.contract}</div>
          ) : null}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter job location"
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.location && formik.errors.location
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={formik.values.location}
            onChange={handleLocationChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          ) : null}
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full h-24 text-black bg-white border border-gray-300 shadow-lg rounded-md z-10 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.properties.place_id}
                  onClick={() => {
                    formik.setFieldValue(
                      "location",
                      suggestion.properties.formatted
                    );
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
