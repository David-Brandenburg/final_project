import User from "../model/Users.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import createToken from "../middleware/createToken.js";
import {v2 as cloudinary} from 'cloudinary';

const saltRounds = 5;

async function createUser(req, res) {
  try {
    const { benutzername, email, password, vorname, nachname } = req.body;
    console.log(req.body.password);
    // hashen des Passwords
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password, salt);

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
			return res.status(404).send({ message: 'No users found!', ok: false})
		}

		return res.status(200).json(accounts);
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
};

async function getUser(req, res) {
	const accountId = req.params.accountId;
	try {
		const findUser = await User.findById(accountId)
		if (!findUser) {
			return res.status(404).send({ message: "User not found!", ok: false })
		}

		return res.json(findUser)
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
};

async function updateAccountProfilePic(req, res) {
	try {
		const accountId = req.params.accountId;
		const account = await User.findById(accountId);
		if (!account) {
			return res.status(404).send({ message: "Account not found!", ok: false })
		}

		if (account.profilePic) {
			const filename = account.profilePic.split("/").pop();
			const publicId = filename.split(".").slice(0, -1).join(".");
			const destroyResult = await cloudinary.uploader.destroy(`ProfilePictures/${publicId}`)
			if (destroyResult.result !== "ok") {
				console.error(destroyResult)
				throw new Error(`Failed to delete image with public_id: ${publicId}`);
			}
		}

		const secureUrl = req.file.path;
		const updatedAccount = await User.updateOne({ _id: account._id }, { $set: { profilePic: secureUrl } });

		if (!updatedAccount) {
			return res.status(400).send({ message: "Update failed", ok: false })
		}

		res.status(200).send({ message: "Successfully updated profile pic!", ok: true, profilePic: secureUrl })
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
};

async function updateAccountPassword(req, res) {
	const accountId = req.params.accountId;
	const { password, newpassword } = req.body;
	try {

		const account = await User.findById( accountId );
		if (!account) {
			return res.status(404).send({ message: "Account not found!", ok: false })
		}
		
		if (!password || !newpassword) {
			return res.status(400).send({ message: "Missing required fields!", ok: false })
		}

		const checkPassword = bcrypt.compareSync(password, account.hashpw)
		if (!checkPassword) {
			return res.status(409).send({ message: "Wrong password!", ok: false })
		}

		const salt = bcrypt.genSaltSync(saltRounds)
		const hashedNewPassword = bcrypt.hashSync(newpassword, salt)

		const updatedAccountPassword = await User.updateOne({ _id: account._id}, { $set: {
			hashpw: hashedNewPassword
		}});

		res.status(200).send({ message: "Successfully updated password!", ok: true, data: updatedAccountPassword })
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
};

async function updateAccountInfo(req, res) {
	try {
		const accountId = req.params.accountId;
		const { benutzername, vorname, nachname, email } = req.body;
		
		const account = await User.findById(accountId);
		if (!account) {
			return res.status(404).send({ message: "Account not found!", ok: false })
		}

		if (email) {
			const checkDuplicateMail = await User.findOne({ email: email })
			if (checkDuplicateMail) {
				return res.status(409).send({ message: "E-Mail already in use!", ok: false })
			}
		}

		if (benutzername) {
			const checkDuplicateBenutzername = await User.findOne({ benutzername: benutzername })
			if (checkDuplicateBenutzername) {
				return res.status(409).send({ message: "Benutzername bereits vergeben!", ok: false })
			}
		}

		const updatedAccountInfo = await User.updateOne({ _id: account._id }, { $set: {
			benutzername,
			vorname,
			nachname,
			email,
		}});
		if (!updatedAccountInfo) {
			return res.status(400).send({ message: "Account not found!", ok: false })
		}

		res.status(200).send({ message: "Succesfully updated account information!", ok: true, data: updatedAccountInfo })
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error!",
      error: error.message,
      ok: false,
    });
	}
};

async function deleteAccount(req, res) {

};

export { createUser, loginUser, getUsers, getUser, updateAccountProfilePic, updateAccountPassword, updateAccountInfo, deleteAccount };
