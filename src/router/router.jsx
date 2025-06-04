import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Home/Register";
import Signin from "../pages/Home/Signin";

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
        }
    ]
  },
]);

export default router;