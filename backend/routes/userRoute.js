import express from "express";
import { getUserById, googleLoginReg, handleGoogleCallback } from "../controllers/userController.js";
const router = express.Router();


router.route('/auth/google').get(googleLoginReg);
router.route('/auth/google/callback').get(handleGoogleCallback);
router.route('/get/:id').get(getUserById);

export default router;