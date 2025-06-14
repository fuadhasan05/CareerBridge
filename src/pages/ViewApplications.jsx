import React from "react";
import { useLoaderData, useParams } from "react-router";

const ViewApplications = () => {
  const { job_id } = useParams();
  const rawApplications = useLoaderData();
  const applications = Array.isArray(rawApplications) ? rawApplications : [];

  return (
    <div>
      <h2>
        {applications.length} Application{applications.length !== 1 && "s"} for: {job_id}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, idx) => 
              <tr key={application._id || idx}>
                <th>{idx + 1}</th>
                <td>{application.applicant}</td>
                <td>{application.jobTitle}</td>
                <td>{application.Status}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
