import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userApi } from "../../api/userAPi";
import { toast } from "sonner"; // For displaying toast notifications

function JobCard({ post }) {
  const user = useSelector((state) => state?.user?.userData?.user); // Get the user from Redux store
  const [jobs, setJobs] = useState({});
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await userApi.fetchApplication(user?._id);
        setJobs(res.jobApp);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobs();
  }, [user?._id,load]); // Depend on user._id
  const isApplied = (jobId) => {
    return jobs?.appliedJobs?.some(
      (job) => job._id.toString() === jobId.toString()
    );
  };
  const handleApply = async (jobId) => {
    try {
      const response = await userApi.applyForJob({ jobId, userId: user._id });
      setLoad(true)
       toast.success(response.message); // Display success message
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply for the job"
      ); // Display error message
    }
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4 mb-4">
      <img
        className="w-full h-32 object-cover mb-3"
        src="https://media.istockphoto.com/id/1173054931/photo/jobs-text-on-wooden-blocks-over-keyboard.jpg?s=612x612&w=0&k=20&c=1d3E26tHR7Yf7AUuGomDISXZTQ_u8PxizqTvo3bvSTY="
        alt="Company Logo"
      />
      <div className="font-bold text-lg mb-2">
        {post.title || "Software Engineer"}
      </div>
      <p className="text-gray-700 text-sm">
        <strong>Company:</strong> {post.companyName}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Contract:</strong> {post.contract}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Location:</strong> {post.location}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Posted on:</strong>{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleApply(post._id)}
          className={`py-1 px-3 rounded text-sm font-bold ${
            isApplied(post._id)
              ? "bg-green-500 text-white hover:bg-green-700 btn-disabled"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          {isApplied(post._id) ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
