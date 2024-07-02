import { Box } from "@mui/material";
import React from "react";
import NewTax from "./Components/NewTax";
import NewTaxTable from "./Components/NewTaxTable";

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
      <NewTax />
      <Box sx={{ height: "75px" }} /> 
      <NewTaxTable />
    </Box>
  );
};

export default Category;
