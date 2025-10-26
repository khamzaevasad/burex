import express from "express";
import restaurantController from "./controller/restaurant.controller";
import productController from "./controller/product.controller";
const router = express.Router();

router.get("/", restaurantController.goHome);
router
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);
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
router.post("/product/create", productController.createNewProduct);
router.post("/product/:id", productController.updateChosenProduct);

export default router;
