import React from "react";
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

const Footer = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000", // Customize primary color
      },
      secondary: {
        main: "#ECF87F", // Customize secondary color
      },
      tertiary: {
        main: "#59981A"
      },
      background: {
        default: "#ECF87F", // Customize background color
      },
    },
  });

  // Use MUI's useMediaQuery to detect screen width
  const isMobileScreen = useMediaQuery("(max-width:600px)");

  return (
    <ThemeProvider theme={theme}>
      <AppBar className="headerPrimary" position="static" style={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Typography
            variant={isMobileScreen ? "body2" : "body1"}
            color="secondary"
            style={{ flexGrow: 1, textAlign: "center", fontFamily: "Jetbrains Mono" }}
          >
            Created for PS-Eng with &#9829;	
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
