import React from "react";
import { Box, Grid, Icon, Paper, Typography, styled } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  borderRadius: 2,
  boxShadow: "0 0 10px #ccc",
}));

const TopItem = () => {
  return (
    <Grid container justifyContent="space-between" spacing={1}>
      <Grid item lg={3} sm={6} xs={12}>
        <Item sx={{ position: "relative", px: 2, pt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item lg={8} sm={6} xs={6}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                }}
                variant="subtitle1"
              >
                CONTACTS
              </Typography>
            </Grid>

            <Grid item lg={12} sm={12} xs={12}>
              {" "}
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 900,
                  display: "flex",
                  color: "#000000",
                }}
                variant="subtitle1"
              >
                <PermIdentityOutlinedIcon />
                350
              </Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Item sx={{ position: "relative", px: 2, pt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item lg={7} sm={6} xs={6}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                }}
                variant="subtitle1"
              >
                CUSTOMERS
              </Typography>
            </Grid>
            <Grid item lg={5} sm={6} xs={6}>
              <Box
                sx={{
                  border: "1px solid #d5fed0",
                  backgroundColor: "#d5fed0",
                }}
              >
                <Typography
                  sx={{
                    color: "#339E91",
                    display: "flex",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  <ArrowUpwardOutlinedIcon style={{ width: 18, height: 18 }} />
                  +02.00 %
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item>
              {" "}
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 900,
                  display: "flex",
                  color: "#000000",
                }}
                variant="subtitle1"
              >
                <GroupOutlinedIcon />
                125
              </Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Item sx={{ position: "relative", px: 2, pt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item lg={7} sm={6} xs={6}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                }}
                variant="subtitle1"
              >
                INVENTORY
              </Typography>
            </Grid>
            <Grid item lg={5} sm={6} xs={6}>
              <Box
                sx={{
                  border: "1px solid #feeaea",
                  backgroundColor: "#feeaea",
                }}
              >
                <Typography
                  sx={{
                    color: "#ed0b0b",
                    display: "flex",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  <ArrowDownwardOutlinedIcon
                    style={{ width: 18, height: 18 }}
                  />
                  +02.00 %
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item>
              {" "}
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 900,
                  display: "flex",
                  color: "#000000",
                }}
                variant="subtitle1"
              >
                <DriveEtaOutlinedIcon />
                985
              </Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Item sx={{ position: "relative", px: 2, pt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item lg={7} sm={6} xs={6}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                }}
                variant="subtitle1"
              >
                REVENUE
              </Typography>
            </Grid>
            <Grid item lg={5} sm={6} xs={6}>
              <Box
                sx={{
                  border: "1px solid #d5fed0",
                  backgroundColor: "#d5fed0",
                }}
              >
                <Typography
                  sx={{
                    color: "#339E91",
                    display: "flex",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  <ArrowUpwardOutlinedIcon style={{ width: 18, height: 18 }} />
                  +20.3 %
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item>
              {" "}
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 900,
                  display: "flex",
                  color: "#000000",
                }}
                variant="subtitle1"
              >
                CAD 9121
              </Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default React.memo(TopItem);
