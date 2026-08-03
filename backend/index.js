import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app,server } from "./socket/socket.js";



const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://talksync-pf5r.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


async function startServer() {
  try {
    
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    await connectDb();
  } catch (err) {
    console.error(err);
  }
}

startServer();
