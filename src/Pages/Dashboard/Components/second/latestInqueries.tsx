import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import RadarIcon from "@mui/icons-material/Radar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";

function index() {
  return (
    <Grid container justifyContent="space-between" spacing={1} sx={{ mt: 4 }}>
      <Box
        sx={{
          width: "100%",
          height: 1.1,
          backgroundColor: "#e5e5e5",
          mx: 1,
          mt: 1,
        }}
      />
      <Grid
        item
        key="2_1"
        lg={12}
        sm={12}
        xs={12}
        direction="row"
        sx={{ m: 1 }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          <CalendarMonthIcon style={{ width: 20, height: 20 }} />
          Inquery Date : 25.August.2023
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          2019 MERCEDES-BENZ A 220 4MATIC
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item lg={8} sm={6} xs={6}>
            <Typography
              sx={{
                fontWeight: 500,
                display: "flex",
                color: "#000000",
                fontSize: "0.9rem",
              }}
            >
              Price Range :
              <span
                style={{ color: "#10bc5e", marginLeft: "4px", fontWeight: 700 }}
              >
                CAD 31,999-CAD 33,000
              </span>
            </Typography>
          </Grid>
          <Grid item lg={3.5} sm={6} xs={6} sx={{ textAlign: "end" }}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 900,
                display: "flex",
                color: "#000000",
                fontSize: "0.8rem",
                textAlign: "end",
              }}
              variant="subtitle1"
            >
              <RadarIcon style={{ width: 20, height: 20 }} />
              Milage :
              <span style={{ marginLeft: "4px", fontWeight: 500 }}>
                {" "}
                61,000Km
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{ width: "100%", height: 1.1, backgroundColor: "#e5e5e5", mx: 1 }}
      />
      <Grid
        item
        key="2_2"
        lg={12}
        sm={12}
        xs={12}
        direction="row"
        sx={{ m: 1 }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          <CalendarMonthIcon style={{ width: 20, height: 20 }} />
          Inquery Date : 25.August.2023
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          2019 MERCEDES-BENZ A 220 4MATIC
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item lg={8} sm={6} xs={6}>
            <Typography
              sx={{
                fontWeight: 500,
                display: "flex",
                color: "#000000",
                fontSize: "0.9rem",
              }}
            >
              Price Range :
              <span
                style={{ color: "#10bc5e", marginLeft: "4px", fontWeight: 700 }}
              >
                CAD 31,999-CAD 33,000
              </span>
            </Typography>
          </Grid>
          <Grid item lg={3.5} sm={6} xs={6} sx={{ textAlign: "end" }}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 900,
                display: "flex",
                color: "#000000",
                fontSize: "0.8rem",
                textAlign: "end",
              }}
              variant="subtitle1"
            >
              <RadarIcon style={{ width: 20, height: 20 }} />
              Milage :
              <span style={{ marginLeft: "4px", fontWeight: 500 }}>
                {" "}
                61,000Km
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{ width: "100%", height: 1.1, backgroundColor: "#e5e5e5", mx: 1 }}
      />
      <Grid
        item
        key="2_3"
        lg={12}
        sm={12}
        xs={12}
        direction="row"
        sx={{ m: 1 }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          <CalendarMonthIcon style={{ width: 20, height: 20 }} />
          Inquery Date : 25.August.2023
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            display: "flex",
            color: "#000000",
            fontSize: "0.9rem",
          }}
        >
          2019 MERCEDES-BENZ A 220 4MATIC
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item lg={8} sm={6} xs={6}>
            <Typography
              sx={{
                fontWeight: 500,
                display: "flex",
                color: "#000000",
                fontSize: "0.9rem",
              }}
            >
              Price Range :
              <span
                style={{ color: "#10bc5e", marginLeft: "4px", fontWeight: 700 }}
              >
                CAD 31,999-CAD 33,000
              </span>
            </Typography>
          </Grid>
          <Grid item lg={3.5} sm={6} xs={6} sx={{ textAlign: "end" }}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 900,
                display: "flex",
                color: "#000000",
                fontSize: "0.8rem",
                textAlign: "end",
              }}
              variant="subtitle1"
            >
              <RadarIcon style={{ width: 20, height: 20 }} />
              Milage :
              <span style={{ marginLeft: "4px", fontWeight: 500 }}>
                {" "}
                61,000Km
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default index;
