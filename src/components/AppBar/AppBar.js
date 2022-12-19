import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import BarCart from "./BarCart";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarSearch from "./BarSearch";

function RRRAppBar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentPage = useLocation();
  const recordsInCart = useSelector((state) => state.cart.cartRecords);
  const [recordTotal, setRecordTotal] = React.useState(0);
  const pages = ["Records", "Reviews", "Community"];
  const userSettings = user.isAdmin
    ? ["Profile", "Account", "Dashboard", "Orders", "Logout"]
    : ["Profile", "Account", "Orders", "Logout"];
  const guestSettings = ["Login"];

  useEffect(() => {
    setRecordTotal(
      recordsInCart.reduce(
        (records, nextRecord) => records + nextRecord.cartRecord.quantity,
        0
      )
    );
  }, [recordsInCart]);

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate("/");
    window.location.reload();
  };

  const login = () => {
    navigate("/login");
  };

  const navDashboard = () => {
    navigate("/dashboard");
  };
  const navUserOrders = () => {
    navigate("/orders");
  };
  const navUserAccount = () => {
    navigate("/account");
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "Logout" || e.target.id === "Logout") logout();
    if (e.target.innerHTML === "Login" || e.target.id === "Login") login();
    if (e.target.innerHTML === "Orders" || e.target.id === "Orders")
      navUserOrders();
    if (e.target.innerHTML === "Dashboard" || e.target.id === "Dashboard")
      navDashboard();
    if (e.target.innerHTML === "Account" || e.target.id === "Account")
      navUserAccount();
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Avatar
              src="/static/RRR Record.png"
              sx={{
                mr: 2,
                height: "auto",
                width: 60,
              }}
            />
          </Link>
          <Avatar
            src="/static/RRR Name.png"
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
            <BarSearch/>
          <Box
            sx={{ mr: 5, display: "flex", placeItems: "center", flexGrow: 0 }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.fullName ?? "Guest"} src={user.avatarUrl} />
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
            {user.username ? (
              <Typography color={"white"} sx={{ ml: 1 }}>
                {`Welcome, ${user.username}!`}
              </Typography>
            ) : (
              <Link href="/login">
                <Typography color="white" sx={{ ml: 1 }}>
                  Sign-in
                </Typography>
              </Link>
            )}
          </Box>
          {currentPage.pathname === `/cart` ? (
            <Badge
              key={`CartBadge`}
              badgeContent={recordTotal}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <BarCart />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default RRRAppBar;
