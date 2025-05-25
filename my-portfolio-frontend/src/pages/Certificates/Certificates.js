import React, { useEffect, useState } from "react";
import "./Certificates.css";
import { fetchSomething } from "../../api/apiClient"; // Import your API helper
import CertificateCard from "./CertificateCard/CertificateCard"; // Import your CertificateCard component

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSomething("get", "/api/certificates", setLoading, setError).then(
      (res) => {
        if (res && res.data) setCertificates(res.data);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="certificates-page-container">Loading certificates...</div>
    );
  }

  if (error) {
    return (
      <div className="certificates-page-container">
        Error loading certificates: {error.message}
      </div>
    );
  }

  return (
    <div className="certificates-page-container">
      <h2>Certificates</h2>
      <div className="certificates-list">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} {...cert} />
        ))}
      </div>
    </div>
  );
}
