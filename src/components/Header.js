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
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";


const Header = () => {
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
        <Toolbar>
          <IconButton
            href="/"
            edge="start"
            color="icon"
            aria-label="icon"
            className="headerIcon"
          >
            <VisibilityIcon />
            <AddRoundedIcon />
            <NewspaperRoundedIcon />
          </IconButton>
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

          <Tooltip title="FAQ">
            <Link to="/faq" style={{ textDecoration: "none" }}>
              <IconButton
                color="secondary"
                className="headerRightIcons"
              >
                <QuizIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
