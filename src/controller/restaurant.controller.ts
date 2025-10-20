import { Request, Response } from "express";
import { T } from "../libs/types/common";

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
restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
  } catch (err) {
    console.log("Error processSignup", err);
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
