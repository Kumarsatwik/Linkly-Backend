import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/dbConfig";
dotenv.config();
connectDb();

const port = 8000;

// routes
import shortUrl from "./routes/shortUrl.routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// test api
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/", shortUrl);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
