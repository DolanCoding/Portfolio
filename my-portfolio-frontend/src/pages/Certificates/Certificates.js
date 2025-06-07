import React, { useEffect, useState } from "react";
import "./Certificates.css";
import { fetchSomething } from "../../api/apiClient"; // Import your API helper
import CertificateCard from "./CertificateCard/CertificateCard"; // Import your CertificateCard component

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState();

  useEffect(() => {
    fetchSomething("get", "/api/certificates", setLoading, setError).then(
      (res) => {
        if (res && res.data) setCertificates(res.data);
      }
    );
  }, []);

  useEffect(() => {
    if (certificates.length > 0 && !selectedCertificate) {
      setSelectedCertificate(certificates[0]);
    }
  }, [certificates, selectedCertificate]);

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
      {selectedCertificate && (
        <CertificateCard
          key={selectedCertificate.id}
          {...selectedCertificate}
        />
      )}
      <div className="certificates-list-table-wrapper">
        <table className="certificates-list-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr
                key={cert.id}
                className={
                  selectedCertificate && selectedCertificate.id === cert.id
                    ? "selected-row"
                    : ""
                }
                onClick={() => setSelectedCertificate(cert)}
                style={{ cursor: "pointer" }}
              >
                <td>{cert.title}</td>
                <td>{cert.type}</td>
                <td>{cert.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
