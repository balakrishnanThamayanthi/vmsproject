import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";


interface IProfileProps {
  notification: HTMLElement | null;
  onClose: () => void;
  open: boolean;
}

const Profile: React.FC<IProfileProps> = ({ notification, onClose, open }) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClose();
  };

  return (
    <Menu
      anchorEl={notification}
      id="account-menu"
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 4,
          // boxShadow: "0 0 25px #73BFB9",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 22,
            height: 22,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleClick}>
        <Typography style={{ marginRight: "8px" }}>Notification:</Typography>
        <Typography variant="h6">You have 216 unreade notification</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <Typography style={{ marginRight: "8px" }}>
          New member registered:
        </Typography>
        <Typography variant="h6">ill y a 4 jours</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <Typography style={{ marginRight: "8px" }}>
          New member registered:
        </Typography>
        <Typography variant="h6">ill y a 4 jours</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <Typography style={{ marginRight: "8px" }}>
          A new contact message has been submitted:
        </Typography>
        <Typography variant="h6">ill y a 4 jours</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <Typography>ASMS Error: Bad Credentials</Typography>
      </MenuItem>
    </Menu>
  );
};

export default Profile;
