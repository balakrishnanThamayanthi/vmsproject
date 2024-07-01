import { Box } from "@mui/material";
import React from "react";
import NewCompany from "./Components/NewCompany"


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
      <NewCompany />
    </Box>
  );
};

export default Category;
