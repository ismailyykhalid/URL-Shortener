import express, { urlencoded } from "express";
import { connectDB } from "./src/db/connection.js";
import router from "./src/routes/urlRoutes.js";
import URL from "./src/models/urlModel.js";
import cors from "cors";

const app = express();
const PORT = 5555;

connectDB();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/url", (req, res, next) => {
  console.log("req i, pharlo pharlo");
  next();
});

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/allurls", async (req, res) => {
  const urls = await URL.find({});
  res.json(urls);
});

app.use("/url", router);
app.listen(PORT, () => {
  console.clear();
  console.log("✅ Server Runing on Port ", PORT);
});
