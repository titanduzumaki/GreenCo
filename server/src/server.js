import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import imageRoute from "./routes/images.route.js";
import cors from "cors";
import locationRoutes from "./routes/location.route.js";
import siteSettingsRoutes from "./routes/siteSettingsRoutes.js";

const PORT = ENV.PORT || 4001;
const app = express();

app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/msg", messageRoute);
app.use("/api/images", imageRoute);
app.use("/api/locations", locationRoutes);
app.use("/api/site-settings", siteSettingsRoutes);

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
