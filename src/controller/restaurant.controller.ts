import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import { LoginInput, MemberInput, ReqAdmin } from "../libs/types/member";
import MemberService from "../model/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const restaurantController: T = {};

// home
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error goHome", err);
  }
};

// signup
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error getSignup", err);
  }
};

// processSignup
restaurantController.processSignup = async (req: ReqAdmin, res: Response) => {
  try {
    console.log("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    newMember.memberImage = file?.path;
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);
    console.log("after", result);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error processSignup", err);
    res.send(err);
  }
};

// login
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error getLogin", err);
  }
};

// processLogin
restaurantController.processLogin = async (req: ReqAdmin, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;
    const memberService = new MemberService();
    const result = await memberService.processLogin(input);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}") </script>`);
  }
};

// logout
restaurantController.logout = async (req: ReqAdmin, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error processLogin", err);
    res.send(err);
  }
};

//checkedAuthenticated
restaurantController.checkedAuthenticated = async (
  req: ReqAdmin,
  res: Response
) => {
  try {
    console.log("checkedAuthenticated");
    if (req.session?.member)
      res.send(
        `<script> alert("Hi ${req.session.member.memberNick}") </script>`
      );
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error processLogin", err);
    res.send(err);
  }
};

// verifyRestaurant
restaurantController.verifyRestaurant = (
  req: ReqAdmin,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

export default restaurantController;
