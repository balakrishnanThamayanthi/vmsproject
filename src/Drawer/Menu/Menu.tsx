import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  Grid,
  InputAdornment,
  SvgIconProps,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Profile from "../../Components/Popup/profile";
import Notification from "../../Components/Popup/notification";
import { appColor } from "../../theme/appColor";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import UserImg from "../../Images/user_login_photo.webp";
import Logo from "../../Images/logo_main_white.webp";
import LoginImg from "../../Images/atto_desk_login_background.webp";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: appColor.black,
  // backgroundImage: `url(${LoginImg})`,
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
  // opacity: 0.1,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: appColor.black,
  // backgroundImage: `url(${LoginImg})`,
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const menuList: {
  title: string;
  icon: SvgIconProps;
  path: string;
  newPage?: boolean;
}[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
];

export default function MiniDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [profilePopUp, setProfilePopUp] = useState<HTMLElement | null>(null);
  const [notificationPopUp, setNotificationPopUp] =
    useState<HTMLElement | null>(null);
  const openProfilePopUp = Boolean(profilePopUp);
  const openNotificationPopUp = Boolean(notificationPopUp);

  const handleClickProfilePopUp = (event: React.MouseEvent<HTMLElement>) => {
    setProfilePopUp(event.currentTarget);
  };

  const handleCloseProfilePopUp = () => {
    setProfilePopUp(null);
  };

  const handleClickNotificationPopUp = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationPopUp(event.currentTarget);
  };

  const handleCloseNotificationPopUp = () => {
    setNotificationPopUp(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: appColor.white }}
      >
        <Toolbar>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? (
              <ChevronLeftIcon sx={{ fontSize: 30, color: appColor.black }} />
            ) : (
              <MenuIcon sx={{ fontSize: 30, color: appColor.black }} />
            )}
          </IconButton>

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="Search in Front"
            sx={{
              width: 350,
              pl: 2,
              "& .MuiFormLabel-root.MuiInputLabel-root": {
                color: "appColors.darkGray[20]",
              },
            }}
            size="small"
            variant="outlined"
          />

          {!open && <></>}
          <Grid
            container
            data-testid="user-content"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ display: "flex" }}
          >
            <Grid item sx={{ pb: 1 }}>
              <Typography sx={{ color: appColor.black, fontSize: 14 }}>
                Super Admin
              </Typography>
            </Grid>
            <Grid item sx={{ pb: 1 }}>
              <Tooltip title="Notification">
                <IconButton
                  onClick={handleClickNotificationPopUp}
                  size="small"
                  aria-haspopup="true"
                >
                  <NotificationsNoneIcon
                    style={{
                      color: appColor.black,
                      width: 36,
                      height: 36,
                      borderRadius: "100%",
                      padding: "auto",
                      margin: "auto",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item sx={{ pb: 1 }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickProfilePopUp}
                  size="small"
                  aria-haspopup="true"
                >
                  <Avatar
                    alt="Travis Howard"
                    src={UserImg}
                    sx={{
                      width: 40,
                      height: 40,
                      padding: "auto",
                      // border: `0.5px solid ${appColors.website[70]}`,
                      margin: "auto",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Profile
            profile={profilePopUp}
            onClose={handleCloseProfilePopUp}
            open={openProfilePopUp}
          />
          <Notification
            notification={notificationPopUp}
            onClose={handleCloseNotificationPopUp}
            open={openNotificationPopUp}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: appColor.black }}
      >
        <DrawerHeader>
          <img
            src={Logo}
            alt="AttoDesk Login"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </DrawerHeader>

        <List>
          {menuList.map((ml, index) => (
            <ListItem
              key={ml.title}
              disablePadding
              sx={{
                display: "block",
                //  color: appColors.website[100]
              }}
            >
              <ListItemButton
                onClick={() => {
                  if (isSmall) {
                    // setDrawer(!openDrawer);
                  }
                  if (ml.newPage) {
                    window.open(ml.path, "_blank");
                  } else {
                    navigate(ml.path);
                  }
                }}
                sx={{
                  minHeight: 45,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: appColor.white,
                  }}
                >
                  {ml.icon as React.ReactNode}
                </ListItemIcon>
                <ListItemText
                  primary={ml.title}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: appColor.white,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
