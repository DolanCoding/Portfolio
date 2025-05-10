import React from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import the placeholder page components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectsViewerPanel from "./pages/Projects/components/ProjectsViewerPanel/ProjectsViewerPanel"; // Import the ProjectsViewerPanel component
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login"; // Import the Login component

// Import Routes and Route from react-router-dom
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [pageName, setPageName] = useState("home"); // Default page name
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const [selectedTags, setSelectedTags] = useState([]); // State to track selected tags
  const [relevance, setRelevance] = useState(false); // State to track relevance
  const [precision, setPrecision] = useState(false); // State to track precision

  const changePageName = (newPageName) => {
    setPageName(newPageName);
  };

  const handleAdminLogin = () => {
    // Handle admin login logic here

    setIsAdmin(true); // Set admin state to true
  };

  const handleSearch = (searchTerm) => {
    // Handle search logic here
  };
  const handleTagRelevance = async (newRelevance) => {
    await handleTagFilter(selectedTags); // Trigger fade-out with current tags
    setRelevance(newRelevance); // Update relevance state
  };
  const handleTagPrecision = async (newPrecision) => {
    await handleTagFilter(selectedTags);
    setPrecision(newPrecision); // Update precision state
  };
  const handleTagFilter = async (newSelectedTags) => {
    return new Promise((resolve) => {
      const visibleProjectCards = document.querySelectorAll(
        ".projects-list .is-visible-for-animation"
      );

      const staggerDelayMs = 100;
      const cssTransitionDurationMs = 300;

      const numberOfElementsToAnimate = visibleProjectCards.length;

      let longestDelay = 0;

      for (let i = 0; i < numberOfElementsToAnimate; i++) {
        const card = visibleProjectCards[i];
        const delay = i * staggerDelayMs;

        longestDelay = delay;

        setTimeout(() => {
          card.classList.add("transition-fade-out");
        }, delay);
      }

      const lastAnimationStartsAt =
        numberOfElementsToAnimate > 0
          ? (numberOfElementsToAnimate - 1) * staggerDelayMs
          : 0;
      const minimumWaitTimeMs =
        lastAnimationStartsAt + cssTransitionDurationMs + 50;

      setTimeout(() => {
        setSelectedTags([...newSelectedTags]); // Update selectedTags after fade-out
        resolve();
      }, minimumWaitTimeMs);
    });
  };

  return (
    <div className="App">
      {/* Render the Header component here */}
      <Header changePageName={changePageName} />
      {/* Add a wrapper div around the Routes */}
      <div className={"main-content-wrapper " + pageName}>
        {" "}
        {/* <-- New wrapper div */}
        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/projects"
            element={
              <Projects
                selectedTags={selectedTags}
                relevance={relevance}
                precision={precision}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login handleAdminLogin={handleAdminLogin} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>{" "}
      {pageName === "projects" ? (
        <ProjectsViewerPanel
          handleSearch={handleSearch}
          handleTagFilter={handleTagFilter}
          handleTagRelevance={handleTagRelevance}
          handleTagPrecision={handleTagPrecision}
          selectedTags={selectedTags}
        />
      ) : null}
      {/* <-- End of wrapper div */}
      <Footer changePageName={changePageName} />
    </div>
  );
}

export default App;
