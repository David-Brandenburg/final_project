import User from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createToken from "../middleware/createToken.js";
import { v2 as cloudinary } from "cloudinary";
import { OAuth2Client } from "google-auth-library";

const saltRounds = 5;
const JWT_SECRET = process.env.JWT_SECRET;
const serviceID = process.env.EMAILJS_SERVICE_ID;
const templateID = process.env.EMAILJS_TEMPLATE_ID;
const publicID = process.env.EMAILJS_PUBLIC_KEY;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function createUser(req, res) {
  try {
    const { benutzername, email, password, vorname, nachname } = req.body;

    // hashen des Passwords
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists!", ok: false });
    }

    const confirmationToken = jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Create User
    const newUser = new User({
      vorname: vorname,
      nachname: nachname,
      benutzername: benutzername,
      email: email,
      hashpw: hash,
      confirmationToken: confirmationToken,
      isEmailVerified: false,
    });

    // Save new user in db
    await newUser.save();
    res.status(201).send({
      message: "Successfully created! Please check your email for verification",
      ok: true,
      confirmationToken: confirmationToken,
      serviceID: serviceID,
      templateID: templateID,
      publicID: publicID,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function confirmEmail(req, res) {
  try {
    const { confirmationToken } = req.params;

    // Verify the JWT
    const decoded = jwt.verify(confirmationToken, JWT_SECRET);

    if (!decoded.email) {
      return res
        .status(400)
        .send({ message: "Invalid confirmationToken", ok: false });
    }

    // Find user by email in token payload
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).send({ message: "User not found", ok: false });
    }

    // Activate user account
    user.isEmailVerified = true;
    await user.save();

    res.redirect("http://localhost:3000/email-verify");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ message: "Token expired", ok: false });
    }
    res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function GoogleLogin(req, res) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      sub,
      email,
      name: benutzername,
      picture: profilePic,
    } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({
        googleId: sub,
        email,
        benutzername,
        profilePic,
        hashpw: "google-auth", // Placeholder for hashpw, as it's required
        isEmailVerified: true,
      });
      await user.save();
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid Google token" });
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
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function getUsers(req, res) {
  try {
    const accounts = await User.find();
    if (!accounts) {
      return res.status(404).send({ message: "No users found!", ok: false });
    }

    return res.status(200).json(accounts);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function getUser(req, res) {
  const accountId = req.params.accountId;
  try {
    const findUser = await User.findById(accountId);
    if (!findUser) {
      return res.status(404).send({ message: "User not found!", ok: false });
    }

    return res.json(findUser);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function updateAccountProfilePic(req, res) {
  try {
    const accountId = req.params.accountId;
    const account = await User.findById(accountId);
    if (!account) {
      return res.status(404).send({ message: "Account not found!", ok: false });
    }

    if (
      account.profilePic &&
      !account.profilePic.includes("googleusercontent")
    ) {
      const filename = account.profilePic.split("/").pop();
      const publicId = filename.split(".").slice(0, -1).join(".");
      const destroyResult = await cloudinary.uploader.destroy(
        `ProfilePictures/${publicId}`
      );

      if (destroyResult.result !== "ok") {
        console.error(destroyResult);
        throw new Error(`Failed to delete image with public_id: ${publicId}`);
      }
    }

    const secureUrl = req.file.path;
    const updatedAccount = await User.updateOne(
      { _id: account._id },
      { $set: { profilePic: secureUrl } }
    );

    if (!updatedAccount) {
      return res.status(400).send({ message: "Update failed", ok: false });
    }

    res.status(200).send({
      message: "Successfully updated profile pic!",
      ok: true,
      profilePic: secureUrl,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function updateAccountPassword(req, res) {
  const accountId = req.params.accountId;
  const { password, newpassword } = req.body;
  try {
    const account = await User.findById(accountId);
    if (!account) {
      return res.status(404).send({ message: "Account not found!", ok: false });
    }

    if (!password || !newpassword) {
      return res
        .status(400)
        .send({ message: "Missing required fields!", ok: false });
    }

    const checkPassword = bcrypt.compareSync(password, account.hashpw);
    if (!checkPassword) {
      return res.status(409).send({ message: "Wrong password!", ok: false });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedNewPassword = bcrypt.hashSync(newpassword, salt);

    const updatedAccountPassword = await User.updateOne(
      { _id: account._id },
      {
        $set: {
          hashpw: hashedNewPassword,
        },
      }
    );

    res.status(200).send({
      message: "Successfully updated password!",
      ok: true,
      data: updatedAccountPassword,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function updateAccountInfo(req, res) {
  try {
    const accountId = req.params.accountId;
    const { benutzername, vorname, nachname, email, isAdmin } = req.body;

    if (typeof isAdmin === "boolean") {
    } else {
      if (!benutzername && !vorname && !nachname && !email) {
        return res
          .status(400)
          .send({ message: "Missing required fields!", ok: false });
      }
    }

    const account = await User.findById(accountId);
    if (!account) {
      return res.status(404).send({ message: "Account not found!", ok: false });
    }

    if (email) {
      const checkDuplicateMail = await User.findOne({ email: email });
      if (checkDuplicateMail) {
        return res
          .status(409)
          .send({ message: "E-Mail already in use!", ok: false });
      }
    }

    if (benutzername) {
      const checkDuplicateBenutzername = await User.findOne({
        benutzername: benutzername,
      });
      if (checkDuplicateBenutzername) {
        return res
          .status(409)
          .send({ message: "Benutzername bereits vergeben!", ok: false });
      }
    }

    const updatedAccountInfo = await User.updateOne(
      { _id: account._id },
      {
        $set: {
          benutzername,
          vorname,
          nachname,
          email,
          isAdmin,
        },
      }
    );
    if (!updatedAccountInfo) {
      return res.status(400).send({ message: "Account not found!", ok: false });
    }

    res.status(200).send({
      message: "Succesfully updated account information!",
      ok: true,
      data: updatedAccountInfo,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function updateMyGames(req, res) {
  try {
    const accountId = req.params.accountId;
    const { gameTitles } = req.body;

    if (!Array.isArray(gameTitles)) {
      return res
        .status(400)
        .send({ message: "gameTitles must be an array!", ok: false });
    }

    const account = await User.findById(accountId);
    if (!account) {
      return res.status(404).send({ message: "Account not found!", ok: false });
    }

    // Abrufen der aktuellen Spiele
    const currentGames = account.myGames;

    // Herausfiltern von bereits vorhandenen Spielen
    const newGames = gameTitles.filter(
      (title) => !currentGames.includes(title)
    );

    if (newGames.length === 0) {
      return res.status(200).send({
        message: "No new games to add!",
        ok: true,
        data: currentGames,
      });
    }

    const updatedMyGames = await User.updateOne(
      { _id: account._id },
      {
        $push: {
          myGames: { $each: newGames },
        },
      }
    );

    res.status(200).send({
      message: "Successfully updated my games!",
      ok: true,
      data: updatedMyGames,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

async function deleteAccount(req, res) {
	try {
		const accountId = req.params.accountId;
		const findAccount = User.findById(accountId);
		if (!findAccount) {
			return res.status(404).send({ message: 'Account not found!', ok: false })
		}

		const deleteAccount = User.findByIdAndDelete(accountId);

		return res.status(204).send({ message: `Account with ID: ${accountId} were successfully removed!`, ok: true, data: deleteAccount });
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
}

async function resetAccountProfilePic(req, res) {
  try {
    const accountId = req.params.accountId;

    const account = await User.findById(accountId);
    if (!account) {
      return res.status(404).send({ message: "Account not found!", ok: false });
    }

    if (account.profilePic === "") {
      return res
        .status(409)
        .send({ message: "Account has no profile picture!", ok: false });
    }

    const updatedAccountPic = await User.updateOne(
      { _id: account._id },
      {
        $set: {
          profilePic: "",
        },
      }
    );

    res.status(200).send({
      message: `Successfully resetted Profile Picture of ${account.benutzername}`,
      ok: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
  }
}

export {
  createUser,
  confirmEmail,
  loginUser,
  getUsers,
  getUser,
  updateAccountProfilePic,
  updateAccountPassword,
  updateAccountInfo,
  deleteAccount,
  resetAccountProfilePic,
  GoogleLogin,
  updateMyGames,
};
