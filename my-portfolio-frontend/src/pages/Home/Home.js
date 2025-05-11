import React from "react";
import "./Home.css"; // Ensure this CSS file is styled to match the persona's requirements (clean, responsive)
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";

function Home() {
  return (
    <section className="home-section">
      {/* Captivating Introduction Section */}
      <div className="intro-container">
        {/* Use a high-quality, professional photo that conveys approachability and confidence */}
        <img
          src={profile}
          alt="Sascha Fischer - Full-stack Developer"
          className="profile-photo"
        />

        {/* Headline focusing on transformation and value */}
        <h1 className="intro-headline">
          Sascha Fischer: Transforming Complex Challenges into Seamless Web
          Experiences
        </h1>

        {/* Storytelling and Emotional Connection */}
        <p className="intro-paragraph">
          My journey into the world of web development wasn't just about writing
          code; it was fueled by a deep-seated fascination with how technology
          can connect people, simplify processes, and empower businesses. I
          thrive on taking abstract ideas and molding them into tangible,
          intuitive applications that genuinely solve problems.
        </p>

        {/* Highlighting Key Skills through Benefit-Oriented Language */}
        <p className="intro-paragraph">
          Leveraging a robust toolkit that includes <b>React</b>, <b>Node.js</b>
          , <b>HTML</b>, <b>CSS</b> and <b>JavaScript</b>, I specialize in
          building modern, responsive, and high-performance full-stack
          applications. My focus isn't just on functionality, but on crafting
          user experiences that are both delightful and effective, ensuring your
          project stands out.
        </p>

        {/* Emphasizing Problem-Solving and Impact */}
        <p className="intro-paragraph">
          I approach every project with a problem-solver's mindset, constantly
          seeking elegant and efficient solutions. My goal is to not just meet
          requirements, but to exceed expectations and deliver applications that
          drive measurable results and create lasting value.
        </p>

        {/* Clear and Compelling Call to Action */}
        <Link to="/projects" className="cta-button primary-cta">
          See How I Bring Ideas to Life &rarr;
        </Link>

        {/* Optional: Subtle hint of scarcity or exclusivity for later engagement */}
        {/* <p className="subtle-hint">Currently accepting new collaborations for QX 20XX.</p> */}
      </div>
    </section>
  );
}

export default Home;
