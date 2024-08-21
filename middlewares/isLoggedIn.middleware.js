import { httpError } from "../utils/apiResponse.utils.js";
import { verifyToken } from "../utils/jwt.utils.js";

const isLoggedIn = async (req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const checkToken = verifyToken(token);

		if (checkToken) {
			req.user = checkToken;
			next();
		}
	} else {
		return res
			.status(400)
			.json(httpError("Invalid token or token not found", false));
	}
};

export default isLoggedIn;
