import User from "../model/Users.js";
// import jwt from "jsonwebtoken";

async function checkAdmin(req, res) {
	try {
		const accountId = req.params.accountId;
		const account = await User.findById(accountId);
		if (!account) {
			return res.status(404).send({ message: "Account not found!", ok: false })
		}

		if (!account.isAdmin) {
			return res.status(409).send({ message: "Not authorized!", ok: false })
		}

		return res.status(200).send({ message: "Successfully authorized!", ok: true, isAdmin: true })
	} catch (error) {
		res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
	}
};

export { checkAdmin };