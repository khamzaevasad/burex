import express from "express";
import restaurantController from "./controller/restaurant.controller";
const router = express.Router();

router.get("/", restaurantController.goHome);
router
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);
router
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

export default router;
