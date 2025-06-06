import React, { useEffect, useState } from "react";
import JobCard from "../Shared/JobCard";

const HotJobs = ({ jobsPromise }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobsPromise.then(setJobs);
  }, [jobsPromise]);

  return (
    <div className="my-20">
      <h2 className="text-4xl text-center my-10 "> Hot Jobs of The Day</h2>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
