import React, { useState } from "react";
import Header from "./components/Header";
import ActionComponent from "./components/ActionComponent";
import Footer from "./components/Footer";
import Toggle from "./components/Toggle";
import useLocalStorage from "use-local-storage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FAQPage from "./components/FAQPage";

const App = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div class="App" data-theme={isDark ? "dark" : "light"}>
      <Router>
        <Header />
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Routes>
          <Route exact path="/" element={<ActionComponent />} />
          <Route exact path="/faq" element={<FAQPage />} />
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
