import { Box } from "@mui/material";
import React from "react";
import NewPrinter from "./Components/NewPrinter";
import NewCoursingTable from "./Components/NewCoursingTable";

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
      <NewPrinter />
      <Box sx={{ height: "75px" }} /> 
      <NewCoursingTable />
    </Box>
  );
};

export default Category;
