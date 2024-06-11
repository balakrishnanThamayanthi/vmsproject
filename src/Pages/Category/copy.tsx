import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { appColor } from "../../theme/appColor";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import ImgUpload from "../../Images/dummy_image.webp";
import CloseIcon from "@mui/icons-material/Close";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";

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
            Catagory
          </Typography>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              // height: "auto",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                lg={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  {/* <AddIcon sx={{ fontSize: 14, marginRight: "8px" }} /> */}
                  Create Catagory
                </Typography>
              </Grid>

              <Grid item lg={4} py={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                >
                  Create Catagory
                </Typography>
                <TextField
                  placeholder="Enter Catagory Name"
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
          </Card>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              // height: "auto",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                lg={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  {/* <AddIcon sx={{ fontSize: 14, marginRight: "8px" }} /> */}
                  Create Sub Catagory
                </Typography>
              </Grid>

              <Grid item lg={4}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                >
                  Select Main Catagory
                </Typography>
                <TextField
                  select
                  size="small"
                  sx={{ width: "100%", fontSize: 14 }}
                  SelectProps={{
                    native: true,
                  }}
                  defaultValue="Main Category 1"
                >
                  {[
                    "Main Category 1",
                    "Main Category 2",
                    "Main Category 3",
                    "Main Category 4",
                  ].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item lg={4} py={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                >
                  Create Sub Catagory
                </Typography>
                <TextField
                  placeholder="Enter Sub Catagory Name"
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
          </Card>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            mb: 5,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              color: "white",
              mt: 2,
              textAlign: "left",
              borderRadius: 0,
              width: "auto",
              "&:hover": {
                backgroundColor: "green",
              },
              "&:active": {
                backgroundColor: "green",
              },
            }}
          >
            <SaveAltIcon sx={{ mr: 1 }} />
            Save
          </Button>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              // height: "auto",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                lg={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  Manage Category
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Typography sx={{ fontSize: 14 }}>
                          Main Category 1
                        </Typography>
                      }
                    />
                    <FormGroup sx={{ ml: 5 }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography sx={{ fontSize: 14 }}>
                            Sub Category 1
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography sx={{ fontSize: 14 }}>
                            Sub Category 2
                          </Typography>
                        }
                      />
                    </FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={{ fontSize: 14 }}>
                          Main Category 2
                        </Typography>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;
