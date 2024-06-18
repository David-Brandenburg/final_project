import mongoose from "mongoose";

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  benutzername: { type: String, required: true },
  vorname: { type: String, default: '' },
  nachname: { type: String, default: '' },
  hashpw: { type: String, required: true },
	profilePic: { type: String, default: '' },
	platformAccounts: {
    Steam: { type: String, default: '' },
    EpicGames: { type: String, default: '' },
    Ubisoft: { type: String, default: '' },
    EAPlay: { type: String, default: '' },
    BattleNET: { type: String, default: '' },
  },
	isAdmin: { type: Boolean, default: false },
}, {versionKey: false});

const User = mongoose.model("Accounts", UserSchema);

export default User;
