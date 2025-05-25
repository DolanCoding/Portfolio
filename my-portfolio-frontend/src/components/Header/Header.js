import React from "react";
import { Link } from "react-router-dom"; // Import Link here
import "./Header.css";

function Header(props) {
  return (
    <header>
      {" "}
      {/* Use a semantic <header> tag */}
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={(e) => props.changePageName("home")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={(e) => props.changePageName("about")}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              onClick={(e) => props.changePageName("projects")}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/certificates"
              onClick={(e) => props.changePageName("certificates")}
            >
              Certificates
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={(e) => props.changePageName("contact")}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; // Export the component
