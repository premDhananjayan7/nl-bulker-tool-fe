import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../component.css";

const FAQPage = () => {
  return (
    <div className="container">
      <div className="faq-box">
        <Container maxWidth="md">
          <Typography className="faqAccordionTitle">
            Frequently Asked Questions (FAQ)
          </Typography>
          <br />
          <Accordion className="faqAccordionContainer">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
            >
              <Typography className="faqAccordionQuestion">What does Bulker do?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faqAccordionAnswer">
                This tool was built to reduce the amount of time taken to fetch JSON data of a variety of use-cases, which requires quite a lot of manual work and wastes valuable time, especially for large use-case scnearios.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Divider variant="middle" className="faqDividerStyle" /> <br />

          <Accordion className="faqAccordionContainer">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
            >
              <Typography className="faqAccordionQuestion">How to use Bulker?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faqAccordionAnswer">
                <ul className="faqAccordionList">
                  <li>
                Grab the Company ID of the required opportunity, and click on Authorize to become a temporary member of that company, after which you can get the required details from the user data displayed, or through other functionalities available.
                </li>
                <li>
                  Ensure the toast notification says that "Authorization successful" before proceeding with using the tool.
                </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Divider variant="middle" className="faqDividerStyle" /> <br />

          <Accordion className="faqAccordionContainer">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
            >
              <Typography className="faqAccordionQuestion">Who can use this tool?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faqAccordionAnswer">
                This tool is primarily built for PSEng and PSX to help in ticket-handling, as entitlements, report as well as NL data can be viewed just by using the Company ID. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Divider variant="middle" className="faqDividerStyle" /> <br />
          <Accordion className="faqAccordionContainer">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expand" />}
            >
              <Typography className="faqAccordionQuestion">Why build/use this tool?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faqAccordionAnswer">
                <ul className="faqAccordionList">
                  <li>
                    Bulker was built for submission as a Hackathon project, and to help in daily usage for ticket-handling.
                  </li>
                  <li>
                    If you want to reduce the amount of time wasted 'inspect-element'ing stuff just to get required JSON data, then this is the tool to use.
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <br />
        </Container>
      </div>
    </div>
  );
};

export default FAQPage;
