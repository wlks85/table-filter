import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <div>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </div>
  );
}
