import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.status(200).json("Hello, world!");
});
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map