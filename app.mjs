import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import monstersRoutes from "./routes/monsters.mjs";

config();

const app = express();
const port = process.env.PORT || 8000;
const backendUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

const whitelist = [
  "http://localhost:1234",
  "http://localhost:8000",
  "https://monster-rng.netlify.app",
];
const corsOptions = {
  // Allowed origins
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: "*",
  methods: "GET,POST",
};

app.use(cors(corsOptions));
app.use(json());
app.use(helmet());
app.use(monstersRoutes);

setInterval(() => {
  fetch(`${backendUrl}/ping`)
    .then((response) => {
      if (response.ok) {
        console.log("Self-ping successful:", response.status);
      } else {
        console.log("Self-ping failed:", response.status);
      }
    })
    .catch((error) => {
      console.error("Self-ping error:", error.message);
    });
}, 900000); // 15 minutes in milliseconds

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
