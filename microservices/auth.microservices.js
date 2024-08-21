import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.route.js";
import dbConnect from "../config/dbConnect.config.js";

const app = express();
const PORT = process.env.PORT || 10001;
const corsOption = {
	origin: "*",
	credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

dbConnect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Auth server listening on ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
