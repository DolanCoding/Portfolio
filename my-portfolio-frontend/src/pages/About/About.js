import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page-container">
      {" "}
      {/* Optional: a main container for padding/centering */}
      <h2>About Me</h2> {/* Main heading for the page */}
      <section className="about-section summary-section">
        <h3>My Story & What Drives Me</h3> {/* Updated Sub-heading */}
        {/* Refined introduction emphasizing passion and core skills */}
        <p>
          My journey into web development is fueled by an unyielding passion for
          transforming intricate ideas into functional, intuitive digital
          experiences. I possess a strong command over core frontend
          technologies – <span className="skill-highlight">HTML</span>,{" "}
          <span className="skill-highlight">CSS</span>,{" "}
          <span className="skill-highlight">JavaScript</span>, and{" "}
          <span className="skill-highlight">React</span> – enabling me to build
          dynamic, responsive user interfaces that captivate and convert.
        </p>
        {/* Including backend expertise and the drive to build solutions */}
        <p>
          Complementing my frontend expertise, my experience in backend
          development with <span className="skill-highlight">Node.js</span> and{" "}
          <span className="skill-highlight">SQL databases</span> allows me to
          construct robust, scalable server-side logic and efficient data
          management systems. What truly excites me is the challenge of tackling
          real-world problems head-on. I am driven to engineer efficient,
          elegant solutions that not only meet technical requirements but also
          genuinely improve users' lives and contribute to meaningful outcomes
          for businesses.
        </p>
        {/* Expressing eagerness to learn and commitment to impactful projects */}
        <p>
          In the fast-paced world of technology, continuous growth is key. I am
          relentlessly curious and dedicated to expanding my skillset, always
          eager to explore new tools and techniques. I am actively seeking
          opportunities to collaborate with innovative teams on impactful
          projects where I can contribute my full-stack expertise and continue
          to evolve as a developer. Let's build something remarkable together.
        </p>
      </section>
      <section className="about-section skills-section">
        <h3>Key Skills</h3> {/* Updated Sub-heading */}
        <p className="centered-p">
          Here are some of the technologies and areas I excel in:
        </p>{" "}
        {/* Updated intro text */}
        <ul>
          <li>HTML & CSS (Flexbox, Grid, Responsive Design)</li>{" "}
          {/* Combined/Detailed */}
          <li>JavaScript (ES6+, DOM Manipulation)</li> {/* Detailed */}
          <li>React, React Router, State Management</li> {/* Detailed */}
          <li>Node.js & Express.js (REST APIs)</li> {/* Detailed */}
          <li>SQL & PostgreSQL (Database Design & Querying)</li>{" "}
          {/* Detailed */}
          <li>Git & GitHub (Version Control)</li>
          <li>Problem Solving & Algorithm Design</li> {/* Added a soft skill */}
          <li>Full-stack Application Architecture</li>{" "}
          {/* Added higher-level skill */}
          {/* Add more skills here that are relevant to your experience */}
        </ul>
      </section>
      {/* Keep the following sections as placeholders for now, ready for content */}
      <section className="about-section projects-practice-section">
        <h3>Projects & Practice</h3>
        <p className="centered-p">
          Here are some key projects I've worked on and areas where I've gained
          practical experience:
        </p>
        <div className="project-entry">
          <h4>[Project Name or Area of Practice]</h4>
          <p className="project-date">[Dates or Timeframe]</p>
          <p>
            [Brief description of the project, its goal, and the technologies
            used. Focus on the impact or problem solved.]
          </p>
          {/* Optional: Link to the project demo or GitHub repo */}
          {/* <p><a href="#" target="_blank" rel="noopener noreferrer">[View Project / Code]</a></p> */}
        </div>
        {/* ... other project entries ... */}
      </section>
      <section className="about-section learning-development-section">
        <h3>Continuous Learning</h3> {/* Updated Sub-heading */}
        <p className="centered-p">
          Details about my ongoing learning journey, courses, and resources I've
          used:
        </p>
        <div className="learning-entry">
          <h4>[Course Name or Learning Focus]</h4>
          <p className="learning-institution">[Platform or Resource]</p>
          <p className="learning-date">[Completion Date or Timeframe]</p>
          {/* Optional: Mention key takeaways or topics covered, linking back to skills */}
          {/* <p>[Key skills strengthened: React hooks, Node.js performance optimization, etc.]</p> */}
        </div>
        {/* ... other learning entries ... */}
      </section>
      {/* You could add other sections like 'Interests' or 'Awards' */}
    </div>
  );
}

export default About;
