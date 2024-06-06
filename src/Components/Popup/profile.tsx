import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

interface IProfileProps {
  profile: HTMLElement | null;
  onClose: () => void;
  open: boolean;
}

const Profile: React.FC<IProfileProps> = ({ profile, onClose, open }) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClose();
  };

  return (
    <Menu
      anchorEl={profile}
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
            width: 32,
            height: 32,
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
        <Avatar /> Profile
      </MenuItem>
      <MenuItem onClick={handleClick}>
        <Avatar /> My account
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <PersonAddIcon fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default Profile;
