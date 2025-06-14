import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Home/Register";
import Signin from "../pages/Home/Signin";
import JobDetails from "../pages/JobDetails";
import PrivateRoutes from "../routes/PrivateRoutes";
import JobApply from "../pages/JobApply";
import MyApplications from "../pages/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJob from "../pages/MyPostedJob";
import ViewApplications from "../pages/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: '/register',
            Component: Register
        },
        {
            path: '/signin',
            Component: Signin
        },
        {
            path: '/jobs/:id',
            Component: JobDetails,
            loader: ({params}) => fetch(`http://localhost:3000/job/${params.id}`)
        },
        {
          path: 'jobApply/:id',
          element: <PrivateRoutes>
            <JobApply></JobApply>
          </PrivateRoutes>
        },
        {
          path: 'myApplications',
          element: <PrivateRoutes>
            <MyApplications></MyApplications>
          </PrivateRoutes>
        },
        {
          path: 'addJob',
          element: <PrivateRoutes>
            <AddJob></AddJob>
          </PrivateRoutes>
        },
        {
          path: 'myPostedJobs',
          element: <PrivateRoutes>
            <MyPostedJob></MyPostedJob>
          </PrivateRoutes>
        },
        {
          path: 'applications/:job_id',
          element: <PrivateRoutes>
            <ViewApplications></ViewApplications>
          </PrivateRoutes>,
          loader: ({params}) => fetch(`http://localhost:3000/applications/job/${params.job_id}`)
        }
    ]
  },
]);

export default router;