import React, { useEffect, useState } from "react";
import HomePage from "./HomePage.jsx";
import "./login.css";

function Login() {
  const [token, setToken] = useState(null);

  // Read token from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (!accessToken) {
      console.log("no Token");
      return;
    }

    setToken(accessToken);
    window.history.replaceState({}, document.title, "/");
    console.log("Authenticated successfully!");

    fetch("https://loop-07er.onrender.com/home/store-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    })
      .then(res => res.json())
      .then(data => console.log("Token stored:", data))
      .catch(err => console.error("Error storing token:", err));
    }, []);

  const handleLogin = () => {
    window.location.href = "https://loop-07er.onrender.com/login";
  };

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