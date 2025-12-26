import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 4000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Backend callback URL (Spotify redirects here)
const REDIRECT_URI = "http://127.0.0.1:4000/callback";

// Frontend URL (React app)
const FRONTEND_URI = "http://127.0.0.1:5173";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
];

// 1️⃣ Redirect user to Spotify login
app.get("/login", (req, res) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: REDIRECT_URI,
    show_dialog: true,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// 2️⃣ Spotify redirects back here with code
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.redirect(`${FRONTEND_URI}/?error=no_code`);
  }

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (data.access_token) {
      // Redirect frontend with access token
      res.redirect(
        `${FRONTEND_URI}/?access_token=${data.access_token}`
      );
    } else {
      res.redirect(`${FRONTEND_URI}/?error=token_failed`);
    }
  } catch (err) {
    console.error(err);
    res.redirect(`${FRONTEND_URI}/?error=server_error`);
  }
});

app.listen(PORT, () =>
  console.log(`Backend running at http://127.0.0.1:${PORT}`)
);
