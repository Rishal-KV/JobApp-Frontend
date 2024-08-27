import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { adminApi } from "../../api/adminApi";
import { toast } from "sonner";


function EditPost({ id, setJobs, onClose }) {
  const [suggestions, setSuggestions] = useState([]);
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      adminApi.fetchSpecificJob(id).then((res) => {
        setJob(res.jobPost);
      });
    }
  }, [id]);

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
        console.log(suggestions,"suggg");


  const formik = useFormik({
    initialValues: {
      jobId: id || "",
      companyName: job?.companyName || "",
      position: job?.position || "",
      contract: job?.contract || "",
      location: job?.location || "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company name is required"),
      position: Yup.string().required("Position is required"),
      contract: Yup.string().required("Contract type is required"),
      location: Yup.string().required("Location is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      adminApi.updatePost(values).then((res) => {
        if (res.status) {
          toast.success(res.message)
          onClose(); // Close the modal
          const updatedJob = res.jobPost;
          setJobs((prevJobs) =>
            prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
          );
        }
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
    <div
    
      tabIndex={-1}
      
      className="fixed   top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative bg-white w-96 rounded-lg shadow-lg p-4 max-w-lg mx-auto ">
        <div className="flex items-center justify-between border-b  border-gray-200 pb-2">
          <h3 className="text-xl font-semibold">Edit Job</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              className={`mt-1 block w-full  px-3 py-2 border text-black ${
                formik.touched.companyName && formik.errors.companyName
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-red-500 text-sm">{formik.errors.companyName}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Enter position"
              className={`mt-1 block w-full px-3 py-2 border text-black ${
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
            <label htmlFor="contract" className="block text-sm font-medium text-gray-700">
              Contract Type
            </label>
            <input
              type="text"
              id="contract"
              name="contract"
              placeholder="Enter contract type"
              className={`mt-1 block w-full px-3 py-2 border text-black ${
                formik.touched.contract && formik.errors.contract
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              value={formik.values.contract}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contract && formik.errors.contract ? (
              <div className="text-red-500 text-sm">{formik.errors.contract}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              className={`mt-1 block w-full px-3 py-2 border text-black ${
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
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md   bg-white shadow-lg h-24 overflow-y-scroll">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.properties.id}
                    className="p-2  text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      formik.setFieldValue("location", suggestion.properties.name);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-gray-500 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
