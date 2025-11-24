import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import { LoginInput, MemberInput, ReqAdmin } from "../libs/types/member";
import MemberService from "../model/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import logger from "../libs/logger";
const memberService = new MemberService();
const restaurantController: T = {};

// home
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    logger.info("goHome");
    res.render("home");
  } catch (err) {
    logger.error("Error goHome", err);
  }
};

// signup
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    logger.info("getSignup");
    res.render("signup");
  } catch (err) {
    logger.error("Error getSignup", err);
  }
};

// processSignup
restaurantController.processSignup = async (req: ReqAdmin, res: Response) => {
  try {
    logger.info("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    const result = await memberService.processSignup(newMember);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    logger.error("Error processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup ') </script>`
    );
  }
};

// login
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    logger.info("getLogin");
    res.render("login");
  } catch (err) {
    logger.error("Error getLogin", err);
  }
};

// processLogin
restaurantController.processLogin = async (req: ReqAdmin, res: Response) => {
  try {
    logger.info("processLogin");
    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    logger.error("Error processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

// getUsers
restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    logger.info("getUsers");
    const result = await memberService.getUsers();
    res.render("users", { users: result });
  } catch (err) {
    logger.error("Error getUsers", err);
    res.redirect("/admin/login");
  }
};

// updateUsers
restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    logger.info("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    logger.error("Error updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// logout
restaurantController.logout = async (req: ReqAdmin, res: Response) => {
  try {
    logger.info("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    logger.error("Error processLogin", err);
    res.send(err);
  }
};

//checkedAuthenticated
restaurantController.checkedAuthenticated = async (
  req: ReqAdmin,
  res: Response
) => {
  try {
    logger.info("checkedAuthenticated");
    if (req.session?.member)
      res.send(
        `<script> alert("Hi ${req.session.member.memberNick}") </script>`
      );
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    logger.error("Error processLogin", err);
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
