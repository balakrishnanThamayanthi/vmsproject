import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";
import SaleChart from "./saleChart";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  borderRadius: 2,
  boxShadow: "0 0 10px #ccc",
  position: "relative",
}));

function index() {
  return (
    <Grid container justifyContent="space-around" spacing={1}>
      <Grid item key="3_1" lg={6} sm={6} xs={12} direction="row">
        <Item sx={{ height: 400, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                pl: 1,
                pt: 1,
                color: "#000000",
              }}
            >
              Monthly Sale Reports
            </Typography>

            <SaleChart />
          </Box>
        </Item>
      </Grid>
      <Grid item key="3_2" lg={3} sm={6} xs={12} direction="row">
        <Item sx={{ height: 400, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                pl: 1,
                pt: 1,
                color: "#000000",
              }}
            >
              Inventory Report
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <PieChart />
          </Box>
        </Item>
      </Grid>
      <Grid item key="3_3" lg={3} sm={6} xs={12} direction="row">
        <Item sx={{ height: 400, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                pl: 1,
                pt: 1,
                color: "#000000",
              }}
            >
              Latest Inqueries
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <PieChart2 />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}

export default index;
