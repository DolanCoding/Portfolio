// ProjectDetails.js
import React, { useState } from "react";
import "./ProjectDetails.css";

function ProjectDetails(props) {
  const [page, setPage] = useState(0);
  const totalPages = 4;
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const {
    id,
    starting_date,
    finished_date,
    timespan,
    hours_per_day,
    image2,
    image3,
    title,
  } = props;
  let { reason, learned_things, key_features, notes } = props;
  learned_things = JSON.parse(learned_things);
  key_features = JSON.parse(key_features);
  reason = JSON.parse(reason);
  notes = JSON.parse(notes);
  return (
    <div id={`${id}`} className="project-details-wrapper">
      <div className="project-details-container">
        <div className="details-container2">
          <h5 className="details-h5">Zeit Investment</h5>
          <div className="details-container2-content">
            <div className="time-investment-content">
              <p>
                <span>Angefangen:</span>
                <span>{starting_date}</span>
              </p>
              <p>
                <span>Beendet:</span>
                <span>{finished_date}</span>
              </p>
              <p>
                <span>Tage:</span>
                <span>{timespan}</span>
              </p>
              <p>
                <span>Stunden pro Tag:</span>
                <span>{hours_per_day}</span>
              </p>
              <p>
                <span>Zeit investment:</span>
                <span>{hours_per_day * timespan}</span>
              </p>
            </div>
            <img src={image2} alt={title}></img>
            <img src={image3} alt={title}></img>
          </div>
        </div>
        {page === 0 ? (
          <>
            <div className="details-container">
              <h5 className="details-h5">Begründung</h5>
              <ul className="list-content">
                {reason.map((reason, index) => (
                  <li key={index}>
                    <strong>{Object.keys(reason)[0]}:</strong>
                    <span>{reason[Object.keys(reason)[0]]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : page === 1 ? (
          <div className="details-container">
            <h5>Neu Erlernte Dinge:</h5>
            <ul className="list-content">
              {learned_things.map((thing, index) => (
                <li key={index}>
                  <strong>{Object.keys(thing)[0]}:</strong>
                  <span>{thing[Object.keys(thing)[0]]}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : page === 2 ? (
          <div className="details-container">
            <h5>Key-features</h5>
            <ul className="list-content">
              {key_features.map((feature, index) => (
                <li key={index}>
                  <strong>{Object.keys(feature)[0]}:</strong>
                  <span>{feature[Object.keys(feature)[0]]}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="details-container">
            <h5>Notes</h5>
            <ul className="list-content">
              {notes.map((note, index) => (
                <li key={index}>
                  <strong>{Object.keys(note)[0]}:</strong>
                  <span>{note[Object.keys(note)[0]]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="details-navigation">
          <button
            className="nav-button left-button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            ←
          </button>
          <div className="page-counter">
            <span>{page + 1}</span> / <span>{totalPages}</span>
          </div>
          <button
            className="nav-button right-button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            →
          </button>
          <button
            className="close-button"
            onClick={() => {
              props.closeDetails();
            }}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
