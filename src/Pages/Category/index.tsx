import React, { useState } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { appColor } from "../../theme/appColor";
import CategoryIcon from "@mui/icons-material/Category";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 62, // Increased width
  height: 34, // Increased height
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(28px)", // Adjusted for increased size
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 30, // Increased thumb size
    height: 30, // Increased thumb size
  },
  "& .MuiSwitch-track": {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#757575" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`, // Using SVG path for check
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`, // Using SVG path for minus
      right: 12,
    },
  },
}));

const Category: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: appColor.blue[10],
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            mt: 2,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              fontSize: "21px",
              color: appColor.black,
            }}
          >
            <CategoryIcon sx={{ fontSize: 24, marginRight: "8px" }} />
            Category
          </Typography>
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            mt: 2,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container spacing={5}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  Create Category
                </Typography>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} py={2}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Name
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      placeholder="Enter Category Name"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Department
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={9}
                    md={9}
                    sm={12}
                    xs={12}
                    display="flex"
                    alignItems="center"
                  >
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1 }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled style={{ color: "gray" }}>
                        Select an option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: 0,
                        ml: 2,
                        border: 1,
                        borderColor: "green",
                        "&:hover": {
                          backgroundColor: "green",
                        },
                        "&:active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: 30 }} />
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Roles
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Coursing
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={9}
                    md={9}
                    sm={12}
                    xs={12}
                    display="flex"
                    alignItems="center"
                  >
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1 }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select an option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: 0,
                        ml: 2,
                        border: 1,
                        borderColor: "green",
                        "&:hover": {
                          backgroundColor: "green",
                        },
                        "&:active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: 30 }} />
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Serving Size Levels
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Tare Group
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select Target Group
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Tare Group
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Item Service Charge
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      placeholder="None"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Hide in POS
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Hide in Online Order
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Hide in Kiosk
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Conversational
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Age Restriction
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Exclude Check Tax
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    display="flex"
                    alignItems="center"
                  >
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} py={2}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Include Default
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Hide in POS
                    </Typography>
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Label Printers
                    </Typography>
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Restrict PRinters
                    </Typography>
                    <IOSSwitch color="primary" sx={{ mr: 2 }} />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Taxes
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={9}
                    md={9}
                    sm={12}
                    xs={12}
                    display="flex"
                    alignItems="center"
                  >
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1 }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: 0,
                        ml: 2,
                        border: 1,
                        borderColor: "green",
                        "&:hover": {
                          backgroundColor: "green",
                        },
                        "&:active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: 30 }} />
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Kitchen Printers
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Restrict Printers
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Display Button
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select Target Group
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Applicable Time Period
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        native: true,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" disabled color="gray">
                        Select some option
                      </option>
                      <option>Food Department</option>
                      <option>Shop Department</option>
                      <option>xx Department</option>
                      <option>cc Department</option>
                      <option>yy Department</option>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveAltIcon />}
                  sx={{
                    backgroundColor: "#b71c1c",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "#b71c1c",
                      boxShadow: "none",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Box m={0.5}></Box>
                <Button
                  variant="contained"
                  startIcon={<SaveAltIcon />}
                  sx={{
                    backgroundColor: "green",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                  }}
                >
                  Save
                </Button>
                <Box m={0.5}></Box>
                <Button
                  variant="contained"
                  startIcon={<SaveAltIcon />}
                  sx={{
                    backgroundColor: "green",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "green",
                      boxShadow: "none",
                    },
                  }}
                >
                  Save and publish
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;
