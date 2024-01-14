import express from "express";
import Connection from "./connection/db.js";
import DefaultData from "./default.js";
import Route from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://spotlightansh.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  sameSite: "lax",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", Route);

Connection();

app.use(express.static("client/build"));

// Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

const category = "all";
DefaultData(category);
setInterval(() => DefaultData(category), 3600000);
