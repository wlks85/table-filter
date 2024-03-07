import { lazy } from "react";
import Loadable from "../components/Loadable";
import { Outlet } from "react-router-dom";
import GuestGuard from "../guards/guestGuard";

const Login = Loadable(lazy(() => import("../pages/Login")));

const PublicRoutes = {
  path: "/",
  element: <GuestGuard />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    { 
      path: "*",
      element: <Outlet />,
    },
  ],
};

export default PublicRoutes;
