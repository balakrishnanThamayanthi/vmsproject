import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NewModifieGroup from "./Components/NewModifieGroup";
import NewModifierTable from "./Components/NewModifierTable";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from '@mui/icons-material/TableView';

const Product: React.FC = () => {
  const [showNewModifier, setShowNewModifier] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleToggle = () => {
    setShowNewModifier(!showNewModifier);
  };

  const handleDataLoaded = () => {
    setIsDataLoaded(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e0e0e0",
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {isDataLoaded && (
      <Box
        sx={{
          textAlign: "end"
        }}
      >
        <Button
          variant="contained"
          startIcon={showNewModifier 
            ? <TableViewIcon sx={{ fontSize: 40 }} /> 
            : <AddIcon sx={{ fontSize: 40 }} />}
          sx={{
            backgroundColor: "green",
            textTransform: "none",
            boxShadow: "none",
            fontSize: 16,
            "& .MuiSvgIcon-root": {
              fontSize: 26, 
            },
            "&:hover": {
              backgroundColor: "green",
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: "green",
              boxShadow: "none",
            },
          }}
          onClick={handleToggle}
        >
          {showNewModifier ? "Modifier Group Table" : "New Modifier Group"}
        </Button>
      </Box>
      )}
      <Box sx={{ height: "40px" }} />{" "}
      {!showNewModifier ? <NewModifieGroup /> : <NewModifierTable onDataLoaded={handleDataLoaded} />}
    </Box>
  );
};

export default Product;
