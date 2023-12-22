import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import QuizIcon from "@mui/icons-material/Quiz";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";
import FaviconImage from "./bulker.png"; // Import your favicon image

const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const icon = isHomePage ? <QuizIcon /> : <HomeIcon />;
  const buttonLink = isHomePage ? "/faq" : "/";
  const tooltipText = isHomePage ? "FAQ" : "Home";

  const root = document.documentElement;
const headerColor = getComputedStyle(root).getPropertyValue('--header').trim();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000", // Customize primary color
      },
      secondary: {
        main: "#ECF87F", // Customize secondary color
      },
      background: {
        default: "#59981A", // Customize background color
      },
      icon: {
        main: "#ECF87F",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar className="headerPrimary">
          {/* <IconButton
            href="/"
            edge="start"
            color="icon"
            aria-label="icon"
            className="headerIcon"
          >
            <VisibilityIcon />
            <AddRoundedIcon />
            <NewspaperRoundedIcon />
          </IconButton> */}
          <Link to="/">
            <img src={FaviconImage} alt="Logo" className="logoIcon" href="/" />
          </Link>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              marginLeft: "12px",
              fontFamily: "Jetbrains Mono",
              color: "inherit",
            }}
          >
            Bulker - Analytics Tool
          </Typography>

          <Tooltip title="GitHub">
            <IconButton
              href="https://github.com/premDhananjayan7"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              className="headerRightIcons"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={tooltipText}>
            <Link to={buttonLink} style={{ textDecoration: "none" }}>
              <IconButton color="secondary" className="headerRightIcons">
                {icon}
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
