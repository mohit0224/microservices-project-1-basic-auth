import jwt from "jsonwebtoken";
import ENV from "./env.utils.js";

const generateToken = (data) => {
	try {
		return jwt.sign({ data }, ENV.JWT_SECRET);
	} catch (err) {
		throw new Error(`Error generating JWT :: ${err}`);
	}
};

const verifyToken = (token) => {
	try {
		return jwt.sign(token, ENV.JWT_SECRET);
	} catch (err) {
		throw new Error(`Error generating JWT :: ${err}`);
	}
};

export { generateToken, verifyToken };
