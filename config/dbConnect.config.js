import mongoose from "mongoose";
import ENV from "../utils/env.utils.js";

const dbConnect = async () => {
	try {
		const { connections } = await mongoose.connect(ENV.MONGODB_URI, {
			dbName: ENV.MONGODB_NAME,
		});
		if (connections[0].readyState === 1) {
			console.log(
				`Database connection established on host ${connections[0].host}`
			);
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export default dbConnect;
