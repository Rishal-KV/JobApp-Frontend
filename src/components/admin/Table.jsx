import { Card, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";

const TABLE_HEAD = ["Name", "Position", "Contract", "Location", "Actions"];

export function Table() {
  const admin = useSelector((state) => state.admin.adminData.admin);
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    adminApi.fetchJob(admin._id).then((res) => {
      setJobs(res.jobs);
    });
  }, [admin._id]);

  const handleDelete = (jobId) => {
    adminApi.deletePost(jobId, admin._id).then((res) => {
      if (res.status) {
        setJobs(res.jobs);
      }
    });
  };

  const openModal = (id) => {
    setJobId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJobId(null);
  };

  return (
    <>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs?.map((data, index) => {
              const isLast = index === jobs?.length - 1;
              const classes = isLast
                ? "p-4 text-center"
                : "p-4 border-b border-blue-gray-50 text-center";

              return (
                <tr key={data._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.companyName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.position}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.contract}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.location}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={() => openModal(data._id)}
                        variant="text"
                        size="small"
                        color="blue"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        color="red"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {isModalOpen && (
        <EditPost
          jobs={jobs}
          setJobs={setJobs}
          id={jobId}
          onClose={closeModal}
        />
      )}
    </>
  );
}
