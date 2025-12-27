import React, { useEffect, useState } from "react";
import HomePage from "./HomePage.jsx";
import "./login.css";

function Login() {
  const [token, setToken] = useState(null);

  // Read token from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState({}, document.title, "/");
      console.log("Authenticated successfully!");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:4000/login";
  };

  // Example: fetch user profile
  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => console.log("User data:", data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div>
        {!token ? (
          <div className="login-page">
            <div className="login-card">
              <h1 className="app-title">Loop</h1>
              <button className="spotify-btn" onClick={handleLogin}>Login with Spotify</button>
            </div>
          </div>
        ) : (
          <HomePage />
        )}
    </div>
  );
}

export default Login;
