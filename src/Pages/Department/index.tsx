import { Box } from "@mui/material";
import React from "react";
import NewDeparment from "./Components/NewDeparment";
import NewDepartmentTable from "./Components/NewDepartmentTable";

const Category: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e0e0e0",
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NewDeparment />
      <Box sx={{ height: "75px" }} /> 
      <NewDepartmentTable />
    </Box>
  );
};

export default Category;
