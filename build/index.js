import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// mongoose.connect(process.env.MONGODB_URL as string)
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
app.get("/", (req, res) => {
    res.status(200).json("Hello, world!");
});
//# sourceMappingURL=index.js.map