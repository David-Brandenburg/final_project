import mongoose from "mongoose";

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  vorname: "string",
  nachname: "string",
  benutzername: "string",
  email: "string",
  hashpw: "string",
});

const User = mongoose.model("Accounts", UserSchema);

export default User;
