import React, { useState, useEffect } from "react";
import axios from "axios";
import "../component.css"; // Import CSS file

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import "react18-json-view/src/dark.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ActionComponent = () => {
  const [companyId, setCompanyId] = useState("");
  // const [responseMessage, setResponseMessage] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [showData, setShowData] = useState(false); // New state to manage data visibility

  const [newsletterId, setNewsletterId] = useState("");
  const [distributionId, setDistributionId] = useState("");

  const [searchID, setSearchID] = useState("");
  const [searchData, setSearchData] = useState(null);
  // const [error, setError] = useState(null);

  // const [reportId, setReportId] = useState("");

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
      await handleGetUserDataAnalytics(); // Fetch newsletter data after setting token
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        bodyClassName: "toast-error",
        theme: "dark",
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
      // localStorage.removeItem("reportData");
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

  const handleGetReportAnalytics = async () => {
    try {
      const response = await axios.get(`http://localhost:3600/api/reports`);

      // Logging the response for Get Report Analytics
      console.log("Report Analytics:", response.data);

      // Set report data in state to be displayed in JSON data box
      setNewsletters([response.data]);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching report analytics", error);
    }
  };

  const handleGetUserDataAnalytics = async () => {
    try {
      const response = await axios.get(`http://localhost:3600/api/userData`);

      // Logging the response for Get Report Analytics
      console.log("User Data:", response.data);

      // Set report data in state to be displayed in JSON data box
      setNewsletters([response.data]);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleGetUserAnalytics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3600/api/userAnalytics`
      );

      // Logging the response for Get Report Analytics
      console.log("User Analytics:", response.data);

      // Set report data in state to be displayed in JSON data box
      setNewsletters([response.data]);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleGetSearchList = async () => {
    try {
      const response = await axios.get(`http://localhost:3600/api/searchList`);

      // Logging the response for Get Report Analytics
      console.log("Search List:", response.data);

      // Set report data in state to be displayed in JSON data box
      setNewsletters([response.data]);
      setShowData(true);
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error("Error fetching search list", error);
    }
  };

  const handleSearch = async () => {
    try {
      // Append search ID to the backend endpoint URL
      const response = await axios.post(
        `http://localhost:3600/api/sendSearchID/${searchID}`
      );

      // Assuming the response.data contains the modified payload with search ID
      const modifiedPayload = response.data;

      // Send modified payload to backend to trigger the external API call
      const searchDataResponse = await axios.post(
        "http://localhost:3600/api/searchData",
        modifiedPayload
      );

      // Assuming searchDataResponse.data holds the response from the external API
      console.log("Received data from backend:", searchDataResponse.data);

      // Process and set the received data in the frontend state
      setNewsletters([searchDataResponse.data]);
      setShowData(true);

      // Save the received data to local storage
      localStorage.setItem(
        "newslettersData",
        JSON.stringify(searchDataResponse.data || [])
      );
    } catch (error) {
      console.error("Error fetching search data:", error);
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

  const themeButton = createTheme({
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
            borderRadius: "18px",
            cursor: "pointer",
            backgroundColor: "#81b622",
            color: "#011627",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#013a20",
              color: "#ecf87f",
              boxShadow: "0 0 15px #ecf87f",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={themeButton}>
      <div className="container">
        <div className="box">
          <Grid container spacing={2.5} justifyContent="center">
            <Grid item xs={3.5} className="textCentered">
              <div>
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      className="accordionSummary"
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Perform Authorization
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <tr>
                        <input
                          className="inputBox"
                          type="text"
                          value={companyId}
                          onChange={(e) => setCompanyId(e.target.value)}
                          placeholder="Enter Company ID"
                        />

                        <Button
                          variant="contained"
                          className="actionButton"
                          onClick={handleSetToken}
                          endIcon={<KeyIcon />}
                        >
                          Authorize
                        </Button>
                      </tr>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Divider variant="middle" className="dividerStyle" /> <br />
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      className="accordionSummary"
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Get Data
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <tr>
                          <td>
                            <Button
                              variant="contained"
                              className="actionButton"
                              onClick={handleGetUserDataAnalytics}
                              endIcon={<AccountCircleRoundedIcon />}
                            >
                              User Data
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              className="actionButton"
                              onClick={handleGetUserAnalytics}
                              endIcon={<AccountCircleRoundedIcon />}
                            >
                              User Info
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="actionButton"
                              variant="contained"
                              onClick={handleGetReportAnalytics}
                              endIcon={<AssessmentIcon />}
                            >
                              Report Analytics
                            </Button>
                          </td>
                        </tr>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Divider variant="middle" className="dividerStyle" /> <br />
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Get Search Data
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="textCentered">
                        <tr>
                          <input
                            className="inputBox"
                            type="text"
                            value={searchID}
                            onChange={(e) => setSearchID(e.target.value)}
                            placeholder="Enter Search ID"
                          />
                          <td>
                            <Button
                              className="actionButton"
                              variant="contained"
                              onClick={handleGetSearchList}
                              endIcon={<ManageSearchIcon />}
                            >
                              Search List
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="actionButton"
                              variant="contained"
                              onClick={handleSearch}
                              endIcon={<PlagiarismIcon />}
                            >
                              Get Search Data
                            </Button>
                          </td>
                        </tr>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Divider variant="middle" className="dividerStyle" /> <br />
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Enter Newsletter ID:
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <tr className="textCentered">
                        <input
                          className="inputBox"
                          type="text"
                          value={newsletterId}
                          onChange={(e) => setNewsletterId(e.target.value)} // Use setNewsletterId here
                        />
                      </tr>
                      <div className="textCentered">
                        <tr>
                          <td>
                            <Button
                              variant="contained"
                              className="actionButton"
                              onClick={handleGetData}
                              endIcon={<ViewListRoundedIcon />}
                            >
                              NL List
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              className="actionButton"
                              onClick={handleGetNewsletterData}
                              endIcon={<TextSnippetRoundedIcon />}
                            >
                              NL Data
                            </Button>
                          </td>
                        </tr>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Divider variant="middle" className="dividerStyle" /> <br />
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Enter Distribution ID:
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <tr>
                        <input
                          className="inputBox"
                          type="text"
                          value={distributionId}
                          onChange={(e) => setDistributionId(e.target.value)} // Use setDistributionId here
                        />
                        <Button
                          variant="contained"
                          className="actionButton"
                          onClick={handleGetDistributionAnalytics}
                          endIcon={<QueryStatsOutlinedIcon />}
                        >
                          Distribution Analytics
                        </Button>
                      </tr>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Divider variant="middle" className="dividerStyle" /> <br />
                <div>
                  <Accordion className="accordionContainer">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="expand" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="accordionTitle">
                        Perform Bulk Action (NL)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="textCentered">
                        <tr>
                          <td>
                            <Button
                              variant="contained"
                              className="actionButton"
                              onClick={() => handleAction("resume")}
                              endIcon={<PlayArrowIcon />}
                            >
                              Resume
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="actionButton"
                              variant="contained"
                              onClick={() => handleAction("pause")}
                              endIcon={<PauseIcon />}
                            >
                              Pause
                            </Button>
                          </td>
                        </tr>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Grid>

            <Grid item xs={1} className="centerContent">
              <Divider orientation="vertical" />
            </Grid>

            <Grid item xs={6} className="centerContent">
              <div className="dataBox">
                <h2
                  style={{ marginLeft: "20px", fontSize: "20px" }}
                  className="textCentered"
                >
                  JSON Data
                </h2>
                <div className="newslettersContainer">
                  <JsonView
                    dark={1}
                    displaySize={true}
                    theme="a11y"
                    src={newsletters}
                    collapsed={false}
                    collapseStringMode="directly"
                    collapseStringsAfterLength={25000}
                    //                   editable
                    // onAdd={params => {
                    //   console.log('[jv onAdd]', params)
                    // }}
                    // onEdit={params => {
                    //   console.log('[jv onEdit]', params)
                    // }}
                    // onDelete={params => {
                    //   console.log('[jv onDelete]', params)
                    // }}
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
      />
    </ThemeProvider>
  );
};

export default ActionComponent;
