import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello, world!");
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});