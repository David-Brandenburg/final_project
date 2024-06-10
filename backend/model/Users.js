import mongoose from "mongoose";

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  vorname: { type: String, default: '' },
  nachname: { type: String, default: '' },
  benutzername: { type: String, required: true },
  email: { type: String, required: true },
  hashpw: { type: String, required: true },
	profilePic: { type: String },
});

const User = mongoose.model("Accounts", UserSchema);

export default User;
