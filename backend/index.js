// import express from "express"
// import dotenv from "dotenv"
// import connectDb from "./config/db.js"
// import authRouter from "./routes/auth.routes.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"

// dotenv.config()

// const port = process.env.PORT || 5000

// const app = express()
// app.use(cors(
//     {
//         origin: "http://localhost:5173",
//         credentials:true

//     }
// ))
// app.use(express.json());
// app.use(cookieParser())

// app.use("/api/auth",authRouter)

// // app.listen(port,()=>{
// //     connectDb()
// //     console.log(`Server started ${port}`)
// // })
// console.log("Before listen");

// const server = app.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });

// server.on("error", (err) => {
//   console.error("Server error:", err);
// });

// connectDb();
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
  origin: "http://localhost:5173",
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