import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

const PORT = ENV.PORT || 4001;
const app = express();

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.get("/test", (req, res) => {
  res.send("server is working fine");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB..", err);
    process.exit(1);
  });
