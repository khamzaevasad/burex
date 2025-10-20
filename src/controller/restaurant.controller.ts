import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { MemberInput } from "../libs/types/member";
import MemberService from "../model/Member.service";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController: T = {};

// home
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home page");
  } catch (err) {
    console.log("Error goHome", err);
  }
};

// signup
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup page");
  } catch (err) {
    console.log("Error getSignup", err);
  }
};

// processSignup
restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("Error processSignup", err);
    res.send(err);
  }
};

// login
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login page");
  } catch (err) {
    console.log("Error getLogin", err);
  }
};

// processLogin
restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
  } catch (err) {
    console.log("Error processLogin", err);
  }
};

export default restaurantController;
