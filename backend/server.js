import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./route/userRoutes.js";
import gameRoutes from "./route/gameRoutes.js";
import apiRoutes from "./route/apiRoutes.js";
import requestLogger from "./middleware/requestlogger.js";
dotenv.config();

const PORT = process.env.PORT;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const app = express();
// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority&appName=FinalProject`
  )
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("Fehler beim Verbinden mit MongoDB:", err));

// MVC Routes here
//
// app.use("accounts", accountsRoutes)
app.use("/accounts", userRoutes);

app.use("/games", gameRoutes);

app.use("/api", apiRoutes);

//
// MVC Routes end

// Error handling middleware
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
  next(err);
});

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
