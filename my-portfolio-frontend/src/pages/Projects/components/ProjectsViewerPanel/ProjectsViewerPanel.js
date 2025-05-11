import React from "react";
import "./ProjectsViewerPanel.css"; // Import the CSS file for styling
const Icons = {
  JavaScript: "https://img.icons8.com/color/48/javascript--v1.png",
  React: "https://img.icons8.com/color/48/react-native.png",
  NodeJS: "https://img.icons8.com/color/48/nodejs.png",
  MongoDB: "https://img.icons8.com/color/48/mongodb.png",
  HTML: "https://img.icons8.com/color/48/html-5--v1.png",
  CSS: "https://img.icons8.com/color/48/css3.png",
  GitHub: "https://img.icons8.com/color/48/github--v1.png",
  Git: "https://img.icons8.com/color/48/git.png",
  Bootstrap: "https://img.icons8.com/color/48/bootstrap.png",
  Python: "https://img.icons8.com/color/48/python--v1.png",
  SQL: "https://img.icons8.com/color/48/sql.png",
  POSTGRESQL: "https://img.icons8.com/color/48/postgresql.png",
  Express: "https://img.icons8.com/color/48/express-js.png",
};
function ProjectsViewerPanel({
  handleTagFilter,
  handleTagRelevance,
  handleTagPrecision,
  selectedTags,
  relevance,
}) {
  const handleDrawer = (e) => {
    const child = e.target;
    const drawer = child.parentElement.parentElement;

    drawer.classList.toggle("projects-viewer-bar-opened");
  };

  console.log("Selected tags:", selectedTags);
  return (
    <>
      <div className="projects-viewer-panel">
        <div onClick={(e) => handleDrawer(e)} className="projects-viewer-bar">
          <img
            src="https://img.icons8.com/color/48/search-more.png"
            alt="Search"
          ></img>
          <div className="projects-viewer-bar-icons">
            {selectedTags.map((tag) => (
              <img
                key={tag}
                src={Icons[tag]}
                alt={tag}
                className="projects-viewer-bar-icon"
              />
            ))}
          </div>
        </div>

        <div className="projects-viewer-panel-search">
          <div className="projects-viewer-panel-tags">
            <div className="projects-viewer-panel-tags-headline">
              <h4>Search Settings</h4>
              <div className="search-settings-toggle-filter">
                <input
                  type="checkbox"
                  id="precisionToggle"
                  class="search-settings-toggle-filter-checkbox"
                  onChange={(e) => handleTagPrecision(e.target.checked)}
                />
                <label
                  for="precisionToggle"
                  class="search-settings-toggle-filter-label"
                  title="Sortierung nach Anzahl der treffenden tags"
                >
                  <span class="search-settings-toggle-filter-status status-one">
                    One
                  </span>
                  <div class="search-settings-toggle-filter-track">
                    <div class="search-settings-toggle-filter-thumb"></div>
                  </div>
                  <span class="search-settings-toggle-filter-status status-all">
                    All
                  </span>
                </label>
              </div>
              <div class="search-settings-toggle-filter">
                <input
                  type="checkbox"
                  id="relevanceToggle"
                  class="search-settings-toggle-filter-checkbox"
                  onChange={(e) => handleTagRelevance(e.target.checked)}
                />
                <label
                  for="relevanceToggle"
                  class="search-settings-toggle-filter-label"
                  title="Sortierung nach Relevanz aktivieren"
                >
                  <div class="search-settings-toggle-filter-track track2">
                    <div class="search-settings-toggle-filter-thumb"></div>
                  </div>
                  <span class="search-settings-toggle-filter-status status2">
                    Relevance
                  </span>
                </label>
              </div>
            </div>
            <div className="projects-viewer-panel-tags-taglist">
              {Object.keys(Icons).map((icon) => (
                <div
                  key={icon}
                  className={
                    selectedTags.includes(icon)
                      ? "projects-viewer-panel-tag selected-tag"
                      : "projects-viewer-panel-tag"
                  }
                >
                  <img src={Icons[icon]} alt={icon} />
                  <label>{icon}</label>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(icon)}
                    onChange={() => {
                      if (selectedTags.includes(icon)) {
                        handleTagFilter(
                          selectedTags.filter((tag) => tag !== icon)
                        );
                      } else {
                        handleTagFilter([...selectedTags, icon], relevance);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsViewerPanel;
