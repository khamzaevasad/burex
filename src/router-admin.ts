import express from "express";
import restaurantController from "./controller/restaurant.controller";
import productController from "./controller/product.controller";
import makeUpLoader from "./libs/utils/uploader";
const router = express.Router();

router.get("/", restaurantController.goHome);
router
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUpLoader("members").single("memberImage"),
    restaurantController.processSignup
  );
router
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

router.get("/check-me", restaurantController.checkedAuthenticated);
router.get("/logout", restaurantController.logout);

// product

router.get(
  "/product/all",
  restaurantController.verifyRestaurant,
  productController.getAllProducts
);
router.post(
  "/product/create",
  restaurantController.verifyRestaurant,
  makeUpLoader("products").array("productImages", 5),
  productController.createNewProduct
);
router.post(
  "/product/:id",
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct
);

// users

router.get(
  "/users",
  restaurantController.verifyRestaurant,
  restaurantController.getUsers
);

export default router;
