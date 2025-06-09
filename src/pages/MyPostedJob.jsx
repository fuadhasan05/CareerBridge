import React, { Suspense } from "react";
import useAuth from "../hocks/useAuth";
import JobList from "./jobList";
import { jobsCreatedByPromise } from "../api/jobsApi";

const MyPostedJob = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>My Posted Jobs: </h2>
      <Suspense>
        <JobList
          jobsCreatedByPromise={jobsCreatedByPromise(user.email)}
        ></JobList>
      </Suspense>
    </div>
  );
};

export default MyPostedJob;
