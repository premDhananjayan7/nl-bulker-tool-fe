import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import QuizIcon from "@mui/icons-material/Quiz";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import DataObjectTwoToneIcon from "@mui/icons-material/DataObjectTwoTone";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
          <GitHubIcon style={{ padding: "0 10px 0 10px" }} color="secondary">
            GitHub
          </GitHubIcon>
          <QuizIcon style={{ padding: "0 10px 0 10px" }} color="secondary">
            GitHub
          </QuizIcon>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
