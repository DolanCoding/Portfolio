import React, { useRef } from "react";
import "./ProjectCard.css";
import ProjectDetails from "../ProjectDetails/ProjectDetails.js";

function ProjectCard(props) {
  let { id, title, description, image, github_link, live_link, tags } = props;
  const cardRef = useRef(null);
  const movedCardsRef = useRef({ above: [], below: [] }); // Store moved cards

  tags = tags.split(",").sort((a, b) => a.length - b.length);

  const openDetails = async () => {
    const cardsList = cardRef.current.parentNode;
    cardsList.style.overflow = "hidden";
    const cards = Array.from(
      document.querySelectorAll(".projects-list .is-visible-for-animation")
    );
    cards[0].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    const clickedCard = cardRef.current;
    const clickedIndex = cards.indexOf(clickedCard);
    const clickedIndexRow = (clickedIndex % 4) + 1;

    // Track moved cards
    movedCardsRef.current.above = cards.slice(0, clickedIndex);
    movedCardsRef.current.below = cards.slice(clickedIndex + 1);

    // Animate above cards
    const staggeredDelay = 100;
    for (let i = 0; i < clickedIndex; i++) {
      const card = cards[i];
      card.style.transitionDelay = `${(i + 1) * staggeredDelay}ms`;
      card.style.transform = `translateY(-${(i + 1) * 21.25 + 21.25}vh)`;
      card.style.opacity = 0;
    }

    // Animate clicked card
    const clickedCardDelay =
      clickedIndexRow + 300 + staggeredDelay * clickedIndex;
    clickedCard.style.transition = `transform 300ms ease`;
    clickedCard.style.transitionDelay = `${clickedCardDelay}ms`;
    if (clickedIndexRow === 2) {
      clickedCard.style.transform = `translateY(-21.25vh)`;
    } else if (clickedIndexRow === 3) {
      clickedCard.style.transform = `translateY(-42.5vh)`;
    } else if (clickedIndexRow === 4) {
      clickedCard.style.transform = `translateY(-63.75vh)`;
    }

    // Expand details
    const detailsDelay = clickedCardDelay + 300;
    const details = clickedCard.querySelector(".project-details-wrapper");
    details.style.transition = `height 1000ms ease`;
    details.style.height = `calc(400% + 3vh)`;
    details.style.transitionDelay = `${detailsDelay}ms`;
    setTimeout(() => {
      details.style.transition = `none`;
    }, detailsDelay + 1000);

    // Animate below cards
    const lowerCardsDelay = detailsDelay + (1000 / 4) * clickedIndexRow - 300;
    for (let i = 0; i < movedCardsRef.current.below.length; i++) {
      const card = movedCardsRef.current.below[i];
      card.style.transitionDelay = `${lowerCardsDelay}ms`;
      card.style.transform = `translateY(${(i + 1) * 21.25 + 42.5}vh)`;
      card.style.opacity = 0;
    }
  };

  const closeDetails = () => {
    const cardsList = cardRef.current.parentNode;
    const clickedCard = cardRef.current;

    // 1) Collapse the details section
    const details = clickedCard.querySelector(".project-details-wrapper");
    details.style.transition = `height 1000ms ease`;
    details.style.height = `0`;
    details.style.transitionDelay = `0ms`;

    // 2) After details collapse, move cards back
    setTimeout(() => {
      // Move above cards back
      movedCardsRef.current.above.forEach((card) => {
        card.style.transitionDelay = `0ms`;
        card.style.transform = `translateY(0)`;
        card.style.opacity = 1;
      });

      // Move clicked card back
      clickedCard.style.transition = `transform 300ms ease`;
      clickedCard.style.transitionDelay = `0ms`;
      clickedCard.style.transform = `translateY(0)`;

      // Move below cards back
      movedCardsRef.current.below.forEach((card) => {
        card.style.transitionDelay = `0ms`;
        card.style.transform = `translateY(0)`;
        card.style.opacity = 1;
      });

      // Restore overflow after animation
      setTimeout(() => {
        cardsList.style.overflow = "";
      }, 400);
    }, 1000); // Wait for details to collapse
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
