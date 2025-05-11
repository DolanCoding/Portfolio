import React, { useState, useEffect, useMemo, useRef } from "react";
import "./Projects.css";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import { fetchSomething } from "../../api/apiClient";

function Projects({ selectedTags, relevance, precision }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetchSomething(
        "get",
        "/api/projects",
        setLoading,
        setError
      );
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // This effect handles the fade-in animation after tags or relevance change
    const ProjectCardElements = document.querySelectorAll(".project-card");
    ProjectCardElements.forEach((element) => {
      element.classList.add("position-outside");
      element.classList.remove("transition-fade-out");
    });

    const staggerDelayMs = 100;

    ProjectCardElements.forEach((card, index) => {
      const delay = index * staggerDelayMs;
      if (index <= 3) {
        setTimeout(() => {
          card.classList.remove("position-outside");
          card.classList.add("transition-fade-in");
          setTimeout(() => {
            card.classList.remove("transition-fade-in");
            card.classList.add("is-visible-for-animation");
          }, 300);
        }, delay);
      } else {
        card.classList.remove("transition-fade-in");
        card.classList.remove("position-outside");
      }
    });
  }, [selectedTags, projects, relevance]); // Include relevance in dependencies

  const sortedFilteredProjects = useMemo(() => {
    const filtered =
      selectedTags.length > 0
        ? projects.filter((project) =>
            selectedTags.some((selectedTag) =>
              String(project.tags)
                .split(",")
                .some((projectTag) => {
                  const processedProjectTag = projectTag
                    .toLowerCase()
                    .trim()
                    .replace(".", "");
                  const processedSelectedTag = String(selectedTag)
                    .toLowerCase()
                    .trim()
                    .replace(".", "");
                  return processedProjectTag === processedSelectedTag;
                })
            )
          )
        : projects;

    const sortableFiltered = [...filtered];

    const getMatchCount = (project, tagsToMatch) => {
      if (!tagsToMatch || tagsToMatch.length === 0) {
        return 0;
      }
      let count = 0;
      const projectTagsProcessed = String(project.tags)
        .split(",")
        .map((tag) => tag.toLowerCase().trim().replace(".", ""));

      tagsToMatch.forEach((selectedTag) => {
        const selectedTagProcessed = String(selectedTag)
          .toLowerCase()
          .trim()
          .replace(".", "");
        if (projectTagsProcessed.includes(selectedTagProcessed)) {
          count++;
        }
      });
      return count;
    };

    console.log("Relevance:", relevance);
    if (relevance) {
      sortableFiltered.sort((a, b) => {
        const matchCountA = getMatchCount(a, selectedTags);
        const matchCountB = getMatchCount(b, selectedTags);
        return matchCountB - matchCountA;
      });
    } else {
      console.log("Sorting by ID");
      sortableFiltered.sort((a, b) => a.id - b.id); // Default sorting by ID
    }

    return sortableFiltered;
  }, [projects, selectedTags, relevance]);

  useEffect(() => {
    const containerElement = scrollContainerRef.current;

    if (!containerElement) {
      return;
    }

    let observer = null;

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
      }

      const options = {
        root: containerElement,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible-for-animation");
          } else {
            entry.target.classList.remove("is-visible-for-animation");
          }
        });
      };

      observer = new IntersectionObserver(handleIntersection, options);

      const projectCardElements =
        containerElement.querySelectorAll(".project-card");
      projectCardElements.forEach((element) => {
        observer.observe(element);
      });
    };

    setupObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [sortedFilteredProjects]);

  if (loading) {
    return <div className="projects-page-container">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="projects-page-container">
        Error loading projects: {error.message}
      </div>
    );
  }

  return (
    <div className="projects-page-container">
      {!precision ? (
        <div ref={scrollContainerRef} className="projects-list">
          {sortedFilteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="projects-list">
          {projects.map((project) => {
            const projectTags = project.tags
              .split(",")
              .map((tag) => tag.toLowerCase().trim().replace(".", ""));
            const allTagsMatch = selectedTags.every((selectedTag) => {
              const processedSelectedTag = String(selectedTag)
                .toLowerCase()
                .trim()
                .replace(".", "");
              return projectTags.includes(processedSelectedTag);
            });

            // Only render the project if all selected tags match
            return allTagsMatch ? (
              <ProjectCard key={project.id} {...project} /> // Pass all project
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default Projects;
