import React from "react";
import TopItem from "./Components/topItem";
import { Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SecondSection from "./Components/second/index";
import SaleChart from "./Components/second/saleChart";
const index = () => {
  return (
    <Box sx={{ bgcolor: "#efffed", pb: 20 }}>
      <Typography
        gutterBottom
        sx={{
          fontWeight: 900,
          display: "flex",
          color: "#000000",
          pb: 1,
          fontSize: 20,
        }}
        variant="subtitle1"
      >
        <TrendingUpOutlinedIcon
          style={{ marginTop: 3, width: 30, height: 30, marginRight: 4 }}
        />
        Dashboard
      </Typography>

      <TopItem />
      <Box sx={{ pb: 2 }} />
      <SecondSection />
      <Box sx={{ pb: 2 }} />
    </Box>
  );
};

export default index;
