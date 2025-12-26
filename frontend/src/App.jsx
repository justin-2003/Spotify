import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  // Read token from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      // Clean URL
      window.history.replaceState({}, document.title, "/");
      console.log("Authenticated successfully!");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:4000/login";
  };

  const handleLogout = () => {
    setToken(null);
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Spotify Clone</h1>

      {!token ? (
        <button
          onClick={handleLogin}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Login with Spotify
        </button>
      ) : (
        <div>
          <p>Logged in! Your token starts with: {token.substring(0, 10)}...</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;