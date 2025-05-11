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
      </div>
    </footer>
  );
}

export default Footer;
