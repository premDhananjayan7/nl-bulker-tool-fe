import React from "react";
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

const Header = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#011627", // Customize primary color
      },
      secondary: {
        main: "#81c5bb", // Customize secondary color
      },
      background: {
        default: "#c19ad8", // Customize background color
      },
      icon: {
        main: "#c19ad8",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton href="/" edge="start" color="icon" aria-label="icon">
            <VisibilityIcon />
            <AddRoundedIcon />
            <NewspaperRoundedIcon />
          </IconButton>
          <Typography
            variant="h7"
            style={{
              flexGrow: 1,
              marginLeft: "10px",
              fontFamily: "JetBrains Mono",
              color: "inherit",
            }}
          >
            Bulker - NL Analytics
          </Typography>

          <Tooltip title="GitHub">
            <IconButton
              href="https://github.com/premDhananjayan7"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="FAQ">
            <IconButton
              href="/FAQ"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
            >
              <QuizIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
