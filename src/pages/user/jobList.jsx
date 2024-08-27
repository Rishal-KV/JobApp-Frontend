import React, { useEffect, useState } from "react";
import JobCard from "../../components/user/Card";
import NavBar from "../../components/user/NavBar";
import { userApi } from "../../api/userAPi";
import { useSelector } from "react-redux";
import axios from 'axios';


const JobListingPage = ({ showAppliedJobs = false }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    contract: "",
    location: "",
    company: "",
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const user = useSelector((state) => state?.user?.userData?.user); // Get the user from Redux store

  useEffect(() => {
    if (showAppliedJobs) {
      fetchAppliedJobs();
    } else {
      fetchJobs(filters);
    }
  }, [filters, showAppliedJobs, user?._id]);

  const fetchJobs = async (filters) => {
    try {
      const res = await userApi.fetchPost(filters); // Assuming fetchPost is for fetching job listings
      setJobs(res.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await userApi.fetchApplication(user._id); // Fetch applied jobs using user ID
      setJobs(res.jobApp.appliedJobs); // Adjust according to the response structure
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      contract: "",
      location: "",
      company: "",
    });
    setLocationSuggestions([]);
    setSelectedLocation("");
  };

  const fetchLocationSuggestions = async (query) => {
    if (!query) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${import.meta.env.VITE_API_KEY}`);
      console.log(response,"resss");
      setLocationSuggestions(response.data.features);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      location: value,
    });
    fetchLocationSuggestions(value);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.properties.name); // Adjust according to the Geoapify response structure
    setFilters({
      ...filters,
      location: location.properties.name,
    });
    setLocationSuggestions([]); // Clear suggestions
  };

  return (
    <div className="min-h-full">
      <NavBar />
      <div className="bg-white py-16 min-h-screen">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
          {!showAppliedJobs && (
            <div className="md:w-64 bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="text-lg  text-Rubik text-black font-bold mb-4">Filters</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract
                </label>
                <select
                  name="contract"
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md w-full"
                  value={filters.contract}
                >
                  <option value="">All Contracts</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="Location"
                  onChange={handleLocationChange}
                  className="p-2 border rounded-md w-full"
                  value={filters.location}
                />
                {locationSuggestions.length > 0 && (
                  <ul className="bg-white border h-28 border-gray-300 rounded-md mt-2  overflow-y-scroll">
                    {locationSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.properties.osm_id}
                        className=" text-black p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleLocationSelect(suggestion)}
                      >
                        {suggestion.properties.formatted}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  name="company"
                  type="text"
                  placeholder="Company"
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md w-full"
                  value={filters.company}
                />
              </div>

              <button
                onClick={resetFilters}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Job Listings Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 ">
              {showAppliedJobs ? "Your Applied Jobs" : "New Job Openings"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {jobs && jobs.length > 0 ? (
    jobs.map((post) => (
      <JobCard key={post._id} post={post} />
    ))
  ) : (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
      <p className="text-gray-500 text-lg">No jobs found</p>
    </div>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingPage;
