import express from "express";
import membersController from "./controller/member.controller";
const router = express.Router();

/** Member **/
router.post("/member/signup", membersController.signup);
router.post("/member/login", membersController.login);
router.get("/member/detail", membersController.verifyAuth);

/** Product **/

/** Order **/

export default router;
