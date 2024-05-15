import User from "../model/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not found", ok: false });
    }

    // Token extrahieren
    const token = authHeader.split(" ")[1];
    const { JWT_SECRET } = process.env;

    // Token überprüfen
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ message: "Invalid token", ok: false });
    }

    // Benutzer mit der ID im Token finden
    const user = await User.findById(payload.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found", ok: false });
    }

    // Füge den gefundenen Benutzer zum Anfrageobjekt hinzu
    req.user = user;

    // Antwort senden und zum nächsten Middleware weiterleiten
    res.status(200).json({ message: "Successfully Authorized!", ok: true });
    next();
  } catch (e) {
    // Fehlerbehandlung
    console.error(e); // Fehlermeldung ausgeben
    res.status(500).json({
      message: "Internal Server Error",
      ok: false,
      error: e.message,
    });
  }
}

export default checkToken;
