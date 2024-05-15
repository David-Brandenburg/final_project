import User from "../model/Users.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import createToken from "../middleware/createToken.js";

const saltRounds = 5;

async function createUser(req, res) {
  try {
    const { benutzername, email, password, vorname, nachname } = req.body;

    // hashen des Passwords
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log(req.body);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists!", ok: false });
    }

    // Create User
    const newUser = new User({
      vorname: vorname,
      nachname: nachname,
      benutzername: benutzername,
      email: email,
      hashpw: hash,
    });

    // Save new user in db
    await newUser.save();
    res.status(201).send({ message: "Successfully created!", ok: true });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists!
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Invaild Email!", ok: false });
    }

    //Check if password is correct
    const isMatch = bcrypt.compareSync(password, user.hashpw);
    if (!isMatch) {
      return res.status(400).send({ message: "Invaild Password!", ok: false });
    }

    const token = createToken(user);
    res.send({ user, token, message: "Login successful!", ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internale Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

export { createUser, loginUser };
