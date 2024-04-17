import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/home";
const Signin = React.lazy(() => import("../views/signin"));
const Signup = React.lazy(() => import("../views/signup"));
const Signout = React.lazy(() => import("../views/singnout"));
const HomePage = React.lazy(() => import("../views/home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeLayout />
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "signout",
        element: <Signout />
      },
    ]
  },

])

export default router;