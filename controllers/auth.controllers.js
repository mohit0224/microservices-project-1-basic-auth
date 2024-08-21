import User from "../models/user.models.js";
import { httpError, httpResponse } from "../utils/apiResponse.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
import {
	createAccountValidation,
	loginAccountValidation,
} from "../validations/auth.validations.js";

const createAccount = async (req, res) => {
	try {
		const data = req.body;

		const { error } = createAccountValidation(data);
		if (error) {
			return res.status(400).json(httpError(error.details[0].message, false));
		}

		const checkUser = await User.findOne({ email: data.email });
		if (checkUser)
			return res.status(500).json(httpError("Email already exists !!", false));

		const newUser = new User({ ...data });
		await newUser.save();

		res.status(200).json(httpResponse("Account has been created !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const loginAccount = async (req, res) => {
	try {
		const data = req.body;

		const { error } = loginAccountValidation(data);
		if (error) {
			return res.status(500).json(httpError(error.details[0].message, false));
		}

		const existUser = await User.findOne({
			$or: [
				{
					username: data.identifier,
				},
				{ email: data.identifier },
			],
		});

		if (!existUser) {
			return res.status(500).json(httpError("User not found !!", false));
		}

		const checkPassword = await existUser.isPasswordCorrect(data.password);
		if (!checkPassword) {
			return res.status(500).json(httpError("Invalid credentials !!", false));
		}

		const token = generateToken(existUser._id);

		return res
			.status(200)
			.cookie("token", token, {
				httpOnly: process.env.NODE_ENV === "production",
				secure: process.env.NODE_ENV === "production",
				// sameSite: "none",
				// domain: process.env.FRONTEND_ORIGIN,
				maxAge: 1 * 60 * 1000,
			})
			.json(httpResponse("Login successfully !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const logoutAccount = async (req, res) => {
	try {
		return res
			.status(200)
			.cookie("token", "", {
				httpOnly: process.env.NODE_ENV === "production",
				secure: process.env.NODE_ENV === "production",
				// sameSite: "none",
				// domain: process.env.FRONTEND_ORIGIN,
				maxAge: 0,
			})
			.json(httpResponse("Logout successfully !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

export { createAccount, loginAccount, logoutAccount };
