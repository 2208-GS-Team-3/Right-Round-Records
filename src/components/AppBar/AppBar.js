import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import BarCart from "./BarCart";

const pages = ["Records", "Reviews", "Community"];
const userSettings = ["Profile", "Account", "Dashboard", "Orders", "Logout"];
const guestSettings = ["Profile", "Account", "Dashboard", "Login"];

function RRRAppBar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  const login = () => {
    navigate("/login");
  };

  const navDashboard = () => {
    navigate("/dashboard");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Logout" || e.target.id === "Logout") logout();
    if (e.target.innerHTML === "Login" || e.target.id === "Login") login();
    if (e.target.innerHTML === "Dashboard" || e.target.id === "Dashboard")
      navDashboard();
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Avatar
              src="static/RRR Record.png"
              sx={{
                mr: 2,
                height: "auto",
                width: 60,
              }}
            />
          </Link>
          <Avatar
            src="static/RRR Name.png"
            variant="square"
            sx={{
              mr: 2,
              height: "auto",
              width: 100,
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`/${page}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{ mr: 5, display: "flex", placeItems: "center", flexGrow: 0 }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.fullName ?? "Guest"} src={user.avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.id
                ? userSettings.map((setting) => (
                    <MenuItem
                      id={setting}
                      value={setting}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))
                : guestSettings.map((setting) => (
                    <MenuItem
                      id={setting}
                      value={setting}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
            {/* BELOW ERROR-- typographys cant be wrapped in typographys. theyre the equivalent of <p> and we cant nest them */}
            <Typography sx={{ ml: 1 }}>
              {user.username ? (
                `Welcome, ${user.username}!`
              ) : (
                <Link href="/login">Sign-in</Link>
              )}
            </Typography>
          </Box>
          <BarCart />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default RRRAppBar;
