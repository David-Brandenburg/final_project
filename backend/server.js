import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./route/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
//
// MVC Routes end

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
