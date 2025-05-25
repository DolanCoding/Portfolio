import React from "react";
import "./CertificateCard.css"; // Import your CSS styles

export default function CertificateCard({
  title,
  issuer,
  date,
  image,
  link,
  description,
  skills,
  type,
}) {
  skills = skills ? skills.split(",") : ""; // Format skills if provided
  return (
    <div className="certificate-card">
      <div className="certificate-row1">
        <div className="certificate-info">
          <h3 className="certificate-title">{title}</h3>
          <p className="certificate-issuer">
            <span>Issuer:</span>
            <span>{issuer}</span>
          </p>
          <p className="certificate-date">
            <span>Date:</span>
            <span>{date}</span>
          </p>
          {type && (
            <p className="certificate-type">
              <span>Type:</span>
              <span>{type}</span>
            </p>
          )}
          <a
            className="certificate-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Certificate
          </a>
        </div>
        <img className="certificate-image" src={image} alt={title} />
      </div>
      <div className="certificate-row2">
        <div className="certificate-details">
          {skills && (
            <p className="certificate-skills">
              <strong>Skills:</strong>{" "}
              {skills.map((skill) => (
                <span className="skill-highlight" key={skill}>{skill}</span>
              ))}
            </p>
          )}
          {description && (
            <p className="certificate-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
