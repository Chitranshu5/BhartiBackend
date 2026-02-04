import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://prismatic-axolotl-69652b.netlify.app", // deployed site
      "http://localhost:5173",                       // Vite local                      // Vite alt
      "http://localhost:5174",                       // optional
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});


server.listen(3000, () => {
  console.log("Server running on port: " + 3000);
  connectDB();
});
