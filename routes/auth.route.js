import { Router } from "express";
import {
	createAccount,
	loginAccount,
	logoutAccount,
} from "../controllers/auth.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.post("/", createAccount);

router.post("/login", loginAccount);

router.post("/logout", isLoggedIn, logoutAccount);

const authRoutes = router;
export default authRoutes;
