import express from "express";
import membersController from "./controller/member.controller";
const router = express.Router();
import makeUpLoader from "./libs/utils/uploader";

/** Member **/
router.post("/member/signup", membersController.signup);
router.post("/member/login", membersController.login);
router.post(
  "/member/logout",
  membersController.verifyAuth,
  membersController.logout
);
router.get(
  "/member/detail",
  membersController.verifyAuth,
  membersController.getMemberDetail
);

router.post(
  "/member/update",
  membersController.verifyAuth,
  makeUpLoader("members").single("memberImage"),
  membersController.updateMember
);

router.get("/member/top-users", membersController.getTopUsers);

/** Product **/

/** Order **/

export default router;
