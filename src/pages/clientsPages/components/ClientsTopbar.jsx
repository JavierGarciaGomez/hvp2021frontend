import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../../actions/authActions";

const pagesData = [
  { label: "Ver perfil", value: "clientProfile" },
  { label: "Iniciar trámite", value: "fcmSelectProcedure" },
  { label: "Estado de trámites", value: "fcmDataProcedures" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const ClientsTopbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(startLogout());
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoToPage = (link) => {
    handleCloseNavMenu();
    navigate(link);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO BOX */}
          <Box noWrap sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            {/* Logo */}
            <Link className="" to="/">
              <img
                className="topbar_imgLogo"
                src="assets/imgs/Logo_HVP.png"
                alt=""
              />
            </Link>
          </Box>

          {/* MENU ICON  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesData.map((page) => (
                <MenuItem
                  key={page.value}
                  onClick={() => handleGoToPage(page.value)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO BOX: Small */}
          <Box noWrap sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link className="" to="/">
              <img
                className="topbar_imgLogo"
                src="assets/imgs/Logo_HVP.png"
                alt=""
              />
            </Link>
          </Box>
          {/* PAGES BUTTONS */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesData.map((page) => (
              <Button
                key={page.value}
                onClick={() => handleGoToPage(page.value)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* AVATAR */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleLogout} sx={{ my: 2, color: "white" }}>
              {/* Todo: pass prop */}
              <Logout />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Todo: pass prop */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {/* AVATAR MENU */}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
