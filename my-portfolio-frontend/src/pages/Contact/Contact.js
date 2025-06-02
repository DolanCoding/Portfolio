import React from "react";
import "./Contact.css"; // Ensure this file exists and is styled

function Contact() {
  return (
    <section className="contact-section">
      <h2>Get In Touch</h2>
      <p className="contact-intro">
        I'm always open to discussing new projects, collaboration opportunities,
        or just saying hello! Feel free to reach out through any of the channels
        below.
      </p>

      <div className="contact-details">
        <div className="contact-item">
          <h3>
            <i className="fab fa-discord"></i> Discord
          </h3>
          <p>
            <a
              href="https://discordapp.com/users/dolan.coding"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with me on Discord"
            >
              dolan.coding
            </a>
          </p>
        </div>

        <div className="contact-item">
          <h3>
            <i className="fab fa-whatsapp"></i> WhatsApp
          </h3>
          <p>
            <a
              href="https://wa.me/+4915755807347"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message me on WhatsApp"
            >
              Message Me
            </a>
            <br />
            (Available for quick chats)
          </p>
        </div>

        <div className="contact-item">
          <h3>
            <i className="far fa-envelope"></i> Email
          </h3>
          <p>
            <a
              href="mailto:sascha.coding.v2@gmail.com"
              aria-label="Send me an email"
            >
              sascha.coding.v2@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* You can add a contact form here later if desired */}
      {/* <div className="contact-form-placeholder">
          <h3>Or send me a message directly:</h3>
          <p>[Contact Form Goes Here]</p>
      </div> */}
    </section>
  );
}

export default Contact;
