import React, { useRef, useState } from "react";
import "./ProjectCard.css";
import ProjectDetails from "../ProjectDetails/ProjectDetails.js";

function ProjectCard(props) {
  let { id, title, description, image, github_link, live_link, tags } = props;
  const cardRef = useRef(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  tags = tags.split(",").sort((a, b) => a.length - b.length);

  const openDetails = () => {
    const cardsList = cardRef.current.parentNode;
    cardsList.style.overflow = "visible";
    const cards = Array.from(cardsList.children); // Always 4 cards
    const clickedCard = cardRef.current;
    const clickedIndex = cards.indexOf(clickedCard);

    // Move cards above up and fade out
    for (let i = 0; i < clickedIndex; i++) {
      const card = cards[i];
      card.style.transition = "transform 0.5s, opacity 0.5s";
      card.style.transform = "translateY(-105%)";
      card.style.opacity = 0;
    }

    // Move clicked card to top
    clickedCard.style.transition = "transform 0.5s";
    clickedCard.style.transform = `translateY(-${clickedIndex * 105}%)`;

    // Move cards below down and fade out
    for (let i = clickedIndex + 1; i < cards.length; i++) {
      const card = cards[i];
      card.style.transition = "transform 0.5s, opacity 0.5s";
      card.style.transform = "translateY(105%)";
      card.style.opacity = 0;
    }

    // After the move animation, expand details and push cards below further down
    setTimeout(() => {
      const details = clickedCard.querySelector(".project-details-wrapper");
      details.style.transition = "height 0.5s";
      details.style.height = "calc(400% + 3vh)";

      // Move cards below further down as details expand
      for (let i = clickedIndex + 1; i < cards.length; i++) {
        const card = cards[i];
        card.style.transition = "transform 0.5s";
        card.style.transform = "translateY(315%)"; // Adjust this value to match the expanded details height
        card.style.opacity = 0;
      }
    }, 500);
  };

  const closeDetails = () => {
    const cardsList = cardRef.current.parentNode;
    const cards = Array.from(cardsList.children); // Always 4 cards
    const clickedCard = cardRef.current;
    const clickedIndex = cards.indexOf(clickedCard);

    // Collapse the details section
    const details = clickedCard.querySelector(".project-details-wrapper");
    details.style.transition = "height 0.5s";
    details.style.height = "0";

    // After details collapse, move cards back
    setTimeout(() => {
      // Move cards above back down and fade in
      for (let i = 0; i < clickedIndex; i++) {
        const card = cards[i];
        card.style.transition = "transform 0.5s, opacity 0.5s";
        card.style.transform = "translateY(0)";
        card.style.opacity = 1;
      }

      // Move clicked card back to its original position
      clickedCard.style.transition = "transform 0.5s";
      clickedCard.style.transform = "translateY(0)";

      // Move cards below back up and fade in
      for (let i = clickedIndex + 1; i < cards.length; i++) {
        const card = cards[i];
        card.style.transition = "transform 0.5s, opacity 0.5s";
        card.style.transform = "translateY(0)";
        card.style.opacity = 1;
      }

      // Restore overflow after animation
      setTimeout(() => {
        cardsList.style.overflow = "";
      }, 400);
    }, 500); // Wait for details to collapse
    setDetailsOpen(false); // Re-enable Details button
  };

  return (
    <>
      <div
        ref={cardRef}
        key={id + " " + title}
        className="project-card position-outside"
        id={id + "-" + title}
      >
        {/* Conditionally add 'is-clamped' class to apply the fade */}
        <div className="project-card-overview">
          <div className={`project-card-text`}>
            <div className={"project-card-title-description"}>
              <h3>{title}</h3>
              {/* Attach the ref to the paragraph you want to check for clamping */}
              <p>{description}</p>
            </div>

            <div className="project-card-tags-links">
              <div className="project-card-tags">
                {tags.map((tag, index) => (
                  <span key={index} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <button
                  onClick={(e) => openDetails(e)}
                  className="project-button"
                  disabled={detailsOpen}
                >
                  Details
                </button>
                <a
                  className="project-button"
                  href={github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="project-button"
                  href={live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
          <img
            className="project-image"
            src={image}
            alt={`Screenshot of ${title}`}
          ></img>
        </div>
        {/* Image element */}

        <ProjectDetails key={id} {...props} closeDetails={closeDetails} />
      </div>
    </>
  );
}

export default ProjectCard;
