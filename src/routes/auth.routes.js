import { Router } from "express";
import {
  login,
  logout,
  register,
  confirm,
  forgotPasswrod,
  forgotHandler,
  profile
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { auth } from "../middlewares/auth.middleware.js"
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout",logout);
router.post("/forgot",forgotPasswrod)
router.post("/forgot/:id/:token",forgotHandler);
router.get("/confirm/:token",confirm);
router.get("/profile", auth, profile);

export default router;