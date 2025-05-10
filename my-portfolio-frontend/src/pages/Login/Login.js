import React, { useState } from "react"; // useState importieren
import "./Login.css";
function Login(props) {
  // State-Variablen für Benutzername und Passwort
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Für Fehlermeldungen vom Server oder Netzwerk
  const [loading, setLoading] = useState(false); // Um den Ladezustand anzuzeigen

  // Handler-Funktion, die aufgerufen wird, wenn sich der Benutzername-Input ändert
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handler-Funktion, die aufgerufen wird, wenn sich der Passwort-Input ändert
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler-Funktion, die aufgerufen wird, wenn das Formular abgeschickt wird
  const handleSubmit = async (event) => {
    event.preventDefault(); // Standardverhalten des Formulars (Seiten-Reload) verhindern

    setError(null); // Alte Fehlermeldungen zurücksetzen
    setLoading(true); // Ladezustand aktivieren

    // Hier ist die URL zu deinem Login-Endpunkt auf dem Server
    // PASSE DIESE URL AN DEINEN SERVER AN!
    const serverUrl = "https://localhost:3001/api/admin_login"; // Beispiel: 'http://localhost:3000/login'

    try {
      const response = await fetch(serverUrl, {
        method: "POST", // HTTP-Methode ist POST für das Senden von Daten
        headers: {
          "Content-Type": "application/json", // Wir senden Daten im JSON-Format
          // Füge hier weitere Header hinzu, falls dein Server sie benötigt (z.B. CSRF-Token)
        },
        body: JSON.stringify({
          // Konvertiere die Daten in einen JSON-String
          username: username,
          password: password,
        }),
      });

      // Überprüfe, ob die Anfrage erfolgreich war (Statuscode 200-299)
      if (!response.ok) {
        // Wenn die Antwort kein Erfolg war, wirf einen Fehler mit dem Status
        const errorData = await response.json(); // Versuche, Fehlerdetails vom Server zu lesen
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // Wenn die Anfrage erfolgreich war
      const data = await response.json(); // Lese die Antwortdaten vom Server (z.B. Authentifizierungs-Token)
      if (data.user) {
        props.handleAdminLogin();
      }

      // Hier kannst du die weiteren Schritte nach erfolgreichem Login durchführen:
      // - Speichere das Token (z.B. in localStorage oder einem Context)
      // - Leite den Benutzer auf eine andere Seite weiter (mit React Router navigate)
      // navigate('/dashboard'); // Beispiel mit React Router
    } catch (error) {
      console.error("Fehler beim Login:", error);
      setError(
        error.message || "Login fehlgeschlagen. Bitte versuche es erneut."
      ); // Fehlermeldung setzen
    } finally {
      setLoading(false); // Ladezustand deaktivieren, unabhängig vom Erfolg
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {/* Füge den onSubmit-Handler zum Formular hinzu */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        {/* Füge value und onChange Handler zu den Inputs hinzu */}
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
          disabled={loading} // Inputs deaktivieren, während geladen wird
        />

        <label htmlFor="password">Password:</label>
        {/* Füge value und onChange Handler zu den Inputs hinzu */}
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          disabled={loading} // Inputs deaktivieren, während geladen wird
        />

        {/* Zeige Fehlermeldung an, falls vorhanden */}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        {/* Button kann während des Ladens deaktiviert werden */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}{" "}
          {/* Text während des Ladens ändern */}
        </button>
      </form>
    </div>
  );
}

export default Login;
