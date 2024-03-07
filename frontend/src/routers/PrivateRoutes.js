import React, { lazy } from "react";
import Loadable from "../components/Loadable";
import { Outlet } from "react-router-dom";
import Setting from "../pages/Setting";
import About from "../pages/About";
import Layout from "../pages/Layout";
import { AuthGuard } from "../guards/authGuard";

const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));

const PrivateRouter = {
  path: "/",
  element: <AuthGuard />,
  children: [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
        {
          path: "*",
          element: <Outlet />,
        },
      ],
    },
  ],
};

export default PrivateRouter;
