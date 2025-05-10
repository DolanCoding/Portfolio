import React, { useRef } from "react";
import "./ProjectCard.css";
import ProjectDetails from "../ProjectDetails/ProjectDetails.js";
function ProjectCard(props) {
  let { id, title, description, image, github_link, live_link, tags } = props;
  const cardRef = useRef(null);

  tags = tags.split(",").sort((a, b) => a.length - b.length);

  const openDetails = async () => {
    //Animations teil
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
    console.log("visible cards are: ", cards);
    const clickedCard = cardRef.current;
    const clickedIndex = cards.indexOf(clickedCard);
    const clickedIndexRow = (clickedIndex % 4) + 1;

    console.log("the clicked card is in row: ", clickedIndexRow);

    // 1) The staggered "drag out" animation of the Cards above the clicked Card
    const staggeredDelay = 100;
    let lowerCards;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      console.log("project title = ", card.id);
      if (i < clickedIndex) {
        card.style.transitionDelay = `${(i + 1) * staggeredDelay}ms`;
        card.style.transform = `translateY(-${(i + 1) * 21.25 + 21.25}vh)`;
        card.style.opacity = 0;
      } else if (i >= clickedIndex) {
        lowerCards = cards.splice(i + 1, cards.length);
        break;
      }
    }

    // 2) The "drag into position of the clicked Card"
    const clickedCardDelay =
      clickedIndexRow + 300 + staggeredDelay * clickedIndex;
    clickedCard.style.transition = `transform 300ms ease`;
    clickedCard.style.transitionDelay = `${clickedCardDelay}ms`;
    if (clickedIndexRow === 2) {
      console.log("row 2");
      clickedCard.style.transform = `translateY(-21.25vh)`;
    } else if (clickedIndexRow === 3) {
      console.log("row 3");
      clickedCard.style.transform = `translateY(-42.5vh)`;
    } else if (clickedIndexRow === 4) {
      console.log("row 4");
      clickedCard.style.transform = `translateY(-63.75vh)`;
    }

    const detailsDelay = clickedCardDelay + 300;
    const details = clickedCard.querySelector(".project-details-wrapper");
    console.log("details = ", details);
    details.style.transition = `height 1000ms ease`;
    details.style.height = `calc(400% + 3vh)`;
    details.style.transitionDelay = `${detailsDelay}ms`;
    setTimeout(() => {
      details.style.transition = `none`;
    }, detailsDelay + 1000);

    const lowerCardsDelay = detailsDelay + (1000 / 4) * clickedIndexRow - 300;
    console.log("lowerCards = ", lowerCards);
    console.log("lowerCards.length = ", lowerCards.length);
    for (let i = 0; i < lowerCards.length; i++) {
      const card = lowerCards[i];
      console.log("card = ", card);
      card.style.transitionDelay = `${lowerCardsDelay}ms`;
      card.style.transform = `translateY(${(i + 1) * 21.25 + 42.5}vh)`;
      card.style.opacity = 0;
    }
  };

  const closeDetails = () => {};
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
