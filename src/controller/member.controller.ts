import MemberService from "../model/Member.service";
import { T } from "../libs/types/common";
import { Response, Request } from "express";
import { MemberInput, LoginInput, Member } from "../libs/types/member";
import Errors from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
const memberService = new MemberService();
const membersController: T = {};

// signup
membersController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body;
    const result: Member = await memberService.signup(input);
    console.log("After create:", result);
    res.json({ member: result });
  } catch (err) {
    console.log("Error signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// login
membersController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    console.log("body", req.body);
    const input: LoginInput = req.body,
      result = await memberService.login(input);

    res.json({ member: result });
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default membersController;
