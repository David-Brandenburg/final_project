import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function createToken(user) {
  const { JWT_SECRET } = process.env;

  // Aktuelle Zeit in Sekunden seit der Unix-Epoche
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  // 30 Tage in Sekunden
  // const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
  const thirtyDaysInSeconds = 5 * 60;

  // Ablaufzeit des Tokens auf 30 Tage nach der aktuellen Zeit setzen
  const expirationTime = currentTimeInSeconds + thirtyDaysInSeconds;

  const payload = {
    uid: user._id,
    exp: expirationTime,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
}

export default createToken;
