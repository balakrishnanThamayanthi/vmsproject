import { Box } from "@mui/material";
import React from "react";
import NewCoursing from "./Components/NewCoursing";
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
      <NewCoursing />
      <Box sx={{ height: "75px" }} /> 
      <NewCoursingTable />
    </Box>
  );
};

export default Category;
