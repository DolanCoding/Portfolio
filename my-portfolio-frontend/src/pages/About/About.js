import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page-container">
      <h2>About Me</h2>
      <section className="about-section summary-section">
        <h3>My Story & What Drives Me</h3>
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
        <h3>Key Skills</h3>
        <p className="centered-p">
          Here are some of the technologies and areas I excel in:
        </p>
        <ul>
          <li>HTML & CSS (Flexbox, Grid, Responsive Design)</li>
          <li>JavaScript (ES6+, DOM Manipulation)</li>
          <li>React, React Router, State Management</li>
          <li>Node.js & Express.js (REST APIs)</li>
          <li>SQL & PostgreSQL (Database Design & Querying)</li>
          <li>Git & GitHub (Version Control)</li>
          <li>Problem Solving & Algorithm Design</li>
          <li>Full-stack Application Architecture</li>
        </ul>
      </section>
      <section class="about-section learning-development-section">
        <h3>Continuous Learning</h3>
        <p class="centered-p">
          Details about my ongoing learning journey, courses, and resources I've
          used:
        </p>
        <div class="learning-entry">
          <h4>Full-Stack Engineer Career Path</h4>
          <p class="learning-institution">Institution: Codecademy.com</p>
          <p class="learning-date">Status: Finished</p>
          <p>
            Key skills strengthened: Developing robust web applications with
            React and Redux, building scalable APIs with Node.js and Express,
            designing and managing databases with SQL and MongoDB, and
            implementing secure user authentication.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
