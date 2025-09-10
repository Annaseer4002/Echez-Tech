import express from "express";
import type { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js"



dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URL as string)
.then(()=>{
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

})

//   app.listen(PORT, () => {
//   console.log("Server running on http://localhost:" + PORT);
// });


app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello, world!");
});


app.use("/api/auth", authRoute)