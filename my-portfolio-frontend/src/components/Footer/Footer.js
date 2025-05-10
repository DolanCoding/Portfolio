// src/components/Footer.js

import React from "react";
import { Link } from "react-router-dom"; // We'll need Link for the admin part
import "./Footer.css"; // We'll create this CSS file next

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Sascha Fischer. All rights reserved.
        </p>
        {/* This is where we'll add the admin link */}
        <div className="admin-link-container">
          {/* For now, the link text is simple. We can style this later */}
          <Link
            to="/login"
            className="admin-link"
            onClick={(e) => props.changePageName("admin")}
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
