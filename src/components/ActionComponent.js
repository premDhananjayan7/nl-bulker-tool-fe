import React, { useState, useEffect } from "react";
import axios from "axios";
import "../component.css"; // Import CSS file

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import "react18-json-view/src/dark.css";

import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ActionComponent = () => {
  const [companyId, setCompanyId] = useState("");
  // const [responseMessage, setResponseMessage] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [showData, setShowData] = useState(false); // New state to manage data visibility

  const [newsletterId, setNewsletterId] = useState("");
  const [distributionId, setDistributionId] = useState("");

  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [filteredData, setFilteredData] = useState([]);

  const handleSetToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3600/perform-login-and-switch",
        {
          companyId: companyId,
        }
      );
      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        bodyClassName: "toast-success",
        theme: "dark",
      });
      setShowData(false); // Hide data when setting a new token
      clearStoredData(); // Clear stored data when setting a new token
      await handleGetData(); // Fetch newsletter data after setting token
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        bodyClassName: "toast-error",
      });
    }
  };

  // const handleAction = async (action) => {
  //   try {
  //     const response = await axios.post("http://localhost:3600/resume-pause", {
  //       action: action,
  //     });
  //     setResponseMessage(response.data.message);
  //     if (action === "pause" || action === "resume") {
  //       // Fetch updated newsletters data after pause/resume action
  //       await handleGetData();
  //     }
  //   } catch (error) {
  //     setResponseMessage(`Error: ${error.message}`);
  //   }
  // };

  const handleAction = async (action) => {
    try {
      const response = await axios.post("http://localhost:3600/resume-pause", {
        action: action,
      });

      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        bodyClassName: "toast-success",
        theme: "dark",
      }); // Display success message

      if (action === "pause" || action === "resume") {
        await handleGetData();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        bodyClassName: "toast-error",
        theme: "dark",
      }); // Display error message
    }
  };

  const handleClearData = () => {
    setNewsletters([]);
    clearStoredData(); // Clear stored data when clearing data
    setShowData(false); // Hide data when clearing data
  };

  const clearStoredData = () => {
    localStorage.removeItem("companyId");
    localStorage.removeItem("newslettersData");
  };

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    }

    const storedNewslettersData = localStorage.getItem("newslettersData");
    if (storedNewslettersData) {
      setNewsletters(JSON.parse(storedNewslettersData));
      setShowData(true); // Show data if stored data exists
    } else {
      setShowData(false); // Hide data if no stored data exists
    }
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    const clearStoredDataOnRefresh = () => {
      localStorage.removeItem("companyId");
      localStorage.removeItem("newslettersData");
    };

    window.addEventListener("beforeunload", clearStoredDataOnRefresh);

    return () => {
      window.removeEventListener("beforeunload", clearStoredDataOnRefresh);
    };
  }, []);

  const handleGetData = async () => {
    try {
      const response = await axios.get("http://localhost:3600/api/newsletters");
      setNewsletters(response.data || []);

      // Only set showData if data is successfully fetched
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  const handleGetNewsletterData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3600/api/newsletters/${newsletterId}/distributions/`
      );
      setNewsletters(response.data || []);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );

      // Logging the response for Get Newsletter Data
      console.log("Newsletter Data Response:", response.data);
    } catch (error) {
      console.error("Error fetching newsletter data:", error);
    }
  };

  const handleGetDistributionAnalytics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3600/api/distribution-analytics/${distributionId}`
      );

      // Logging the response for Get Distribution Analytics
      console.log("Distribution Analytics Response:", response.data);

      // Update newsletters state with distribution analytics data
      setNewsletters(response.data || []);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching distribution analytics:", error);
    }
  };

  const handleDownloadCSV = () => {
    let displayedData = newsletters;

    const predefinedHeadersForDistributionAnalytics = [
      "emailAddress",
      "opened",
      "clicked",
      "bounced",
      "blocked",
      "delivered",
      //   "total",
    ];

    if (
      displayedData &&
      typeof displayedData === "object" &&
      !Array.isArray(displayedData)
    ) {
      // Check if the data is from handleGetDistributionAnalytics and format it accordingly
      const recipientData = displayedData.recipients || [];
      displayedData = recipientData.map((recipient) => {
        const mappedData = predefinedHeadersForDistributionAnalytics.reduce(
          (acc, header) => {
            acc[header] = recipient[header] || ""; // Map recipient properties to predefined headers
            return acc;
          },
          {}
        );
        return mappedData;
      });
    }

    if (Array.isArray(displayedData) && displayedData.length > 0) {
      try {
        const headers = Object.keys(displayedData[0]);

        // Convert data to CSV content
        const csvContent =
          headers.join(",") +
          "\n" +
          displayedData
            .map((row) =>
              headers
                .map((fieldName) =>
                  JSON.stringify(row[fieldName]).replace(/"/g, '""')
                )
                .join(",")
            )
            .join("\n");

        // Create a Blob object and trigger download
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "displayed_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating CSV:", error);
      }
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "JetBrains Mono",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            fontFamily: "Archivo, sans-serif",
            textTransform: "none",
            fontSize: "13px",
            padding: "10px 15px",
            margin: "5px",
            borderRadius: "15px",
            cursor: "pointer",
            backgroundColor: "#81c5bb",
            color: "#011627",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#011627",
              color: "#c19ad8",
              boxShadow: "0 0 15px #c19ad8",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="box">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} className="centerContent">
              <div className="textCentered">
                <h2>Enter Company ID:</h2>
                <input
                  className="inputBox"
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                />
                <Button
                  variant="contained"
                  className="actionButton"
                  onClick={handleSetToken}
                  endIcon={<KeyIcon />}
                >
                  Authorize
                </Button>

                {/* <h2>Response:</h2>
                <p className="responseText">{responseMessage}</p> */}

                <h2>Enter Newsletter ID:</h2>

                <input
                  className="inputBox"
                  type="text"
                  value={newsletterId}
                  onChange={(e) => setNewsletterId(e.target.value)}
                />
                <tr>
                  <td>
                    <Button
                      variant="contained"
                      className="actionButton"
                      onClick={handleGetData}
                    >
                      Get NL List
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      className="actionButton"
                      onClick={handleGetNewsletterData}
                    >
                      Get NL Data
                    </Button>
                  </td>
                </tr>
                <h2>Enter Distribution ID:</h2>
                <input
                  className="inputBox"
                  type="text"
                  value={distributionId}
                  onChange={(e) => setDistributionId(e.target.value)}
                />
                <Button
                  variant="contained"
                  className="actionButton"
                  onClick={handleGetDistributionAnalytics}
                >
                  Get Distribution Analytics
                </Button>
                <br />
                <h2>Perform Bulk Action</h2>
                <table>
                  <tr>
                    <td>
                      <Button
                        variant="contained"
                        className="actionButton"
                        onClick={() => handleAction("resume")}
                        endIcon={<PlayArrowIcon />}
                      >
                        Resume NL
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        className="actionButton"
                        onClick={() => handleAction("pause")}
                        endIcon={<PauseIcon />}
                      >
                        Pause NL
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </Grid>

            <Grid item xs={1} className="centerContent">
              <Divider orientation="vertical" />
            </Grid>

            <Grid item xs={6} className="centerContent">
              <div className="dataBox">
                <h2 style={{ marginLeft: "20px" }} className="textCentered">
                  JSON Data
                </h2>
                <div className="newslettersContainer">
                  <JsonView
                    dark={1}
                    displaySize={true}
                    theme="winter-is-coming"
                    src={newsletters}
                  />
                </div>
                <br />
                <div className="textCentered">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Button
                            variant="contained"
                            className="actionButton"
                            onClick={handleClearData}
                            endIcon={<DeleteIcon />}
                          >
                            Clear Data
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="contained"
                            className="actionButton"
                            onClick={handleDownloadCSV}
                            endIcon={<DownloadIcon />}
                          >
                            Download CSV
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </ThemeProvider>
  );
};

export default ActionComponent;
