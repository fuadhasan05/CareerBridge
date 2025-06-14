import React from "react";
import useAuth from "../../hocks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddJob = () => {
  const { user } = useAuth();

  const handleAddAJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate salary range
    const { minSalary, maxSalary, currency, ...newJob } = data;
    newJob.salaryRange = { minSalary, maxSalary, currency };

    // prepare the job data
    const requrementsString = newJob.requirements;
    const requrementsDirty = requrementsString.split(",");
    const requirementsCleaned = requrementsDirty.map((req) => req.trim());
    newJob.requirements = requirementsCleaned;

    //
    newJob.responsibilities = newJob.responsibilities
      .split(",")
      .map((resp) => resp.trim());

    newJob.status = "active";

    console.log(newJob);

    // save job to the database
    axios
      .post("http://localhost:3000/job", newJob)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Job has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Add a New Job
      </h2>
      <form
        onSubmit={handleAddAJob}
        className="space-y-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8"
      >
        {/* Basic Info */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Basic Info
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Job Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Frontend Developer"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Google"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. San Francisco, CA"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Company Logo URL
              </label>
              <input
                type="url"
                name="company_logo"
                placeholder="https://logo.com/logo.png"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>
        </fieldset>

        {/* Job Type */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Job Type
          </legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input type="radio" name="jobType" value="On Site" required />
              On Site
            </label>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input type="radio" name="jobType" value="Remote" />
              Remote
            </label>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input type="radio" name="jobType" value="Hybrid" />
              Hybrid
            </label>
          </div>
        </fieldset>

        {/* Job Category */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Job Category
          </legend>
          <select
            name="category"
            className="select select-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            required
          >
            <option value="">Select a Category</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            {/* Add more categories as needed */}
          </select>
        </fieldset>

        {/* Application Deadline */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Application Deadline
          </legend>
          <input
            type="date"
            name="applicationDeadline"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            required
          />
        </fieldset>

        {/* Salary Range */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Salary Range
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Minimum Salary
              </label>
              <input
                type="number"
                name="min"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="e.g. 50000"
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Maximum Salary
              </label>
              <input
                type="number"
                name="max"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="e.g. 120000"
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="select select-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                required
              >
                <option value="">Select Currency</option>
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
                <option value="EU">EU</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Job Description */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Job Description
          </legend>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            placeholder="Describe the job role, responsibilities, and expectations."
            rows={4}
            required
          ></textarea>
        </fieldset>

        {/* Job Requirements */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Job Requirements
          </legend>
          <textarea
            name="requirements"
            className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            placeholder="List requirements, separated by commas."
            rows={3}
            required
          ></textarea>
        </fieldset>

        {/* Job Responsibilities */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Job Responsibilities
          </legend>
          <textarea
            name="responsibilities"
            className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            placeholder="List responsibilities, separated by commas."
            rows={3}
            required
          ></textarea>
        </fieldset>

        {/* HR Related Info */}
        <fieldset>
          <legend className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            HR Contact Info
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                HR Name
              </label>
              <input
                type="text"
                name="hr_name"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                HR Email
              </label>
              <input
                type="email"
                id="hrEmail"
                name="hr_email"
                defaultValue={user.email}
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="e.g. hr@company.com"
                required
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary px-8 py-2 text-lg text-white dark:text-gray-100"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
