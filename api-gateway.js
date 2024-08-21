import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const corsOptions = {
	origin: "*",
	credentials: true,
};

app.use(cors(corsOptions));

const authRoute = "http://localhost:3001";

const microservices = [
	{
		path: "/api/v1/auth",
		route: authRoute,
	},
];

microservices.forEach((services) => {
	app.use(
		createProxyMiddleware({
			target: services.route,
			pathFilter: services.path,
			changeOrigin: true,
		})
	);
});

export default app;
