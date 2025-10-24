import express from "express";
import membersController from "./controller/member.controller";
const router = express.Router();

router.post("/signup", membersController.signup);
router.post("/login", membersController.login);

export default router;
