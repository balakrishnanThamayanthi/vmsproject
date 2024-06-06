import {
    Box,
    Grid,
    InputBase,
    alpha,
    styled,
  } from "@mui/material";
  import React from "react";
  import SearchIcon from "@mui/icons-material/Search";

  
  const SearchWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%", // Ensure search component spans the entire width of the parent
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
  }));
  
  const Search = () => {
    return (
      <Box sx={{ py: 2 }}>
        <Grid container item sx={{ width: "100%" }}>
          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ fontSize: "1.5rem" }}
            />
          </SearchWrapper>
        </Grid>
      </Box>
    );
  };
  
  export default Search;
  