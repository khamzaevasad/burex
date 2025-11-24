import express from "express";
import membersController from "./controller/member.controller";
const router = express.Router();
import makeUpLoader from "./libs/utils/uploader";
import orderController from "./controller/order.controller";
import productController from "./controller/product.controller";

/** Member **/
router.get("/member/restaurant", membersController.getRestaurant);

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
router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  membersController.retrieveAuth,
  productController.getProduct
);

/** Order **/

router.post(
  "/order/create",
  membersController.verifyAuth,
  orderController.createOrder
);

router.get(
  "/order/all",
  membersController.verifyAuth,
  orderController.getMyOrders
);

router.post(
  "/order/update",
  membersController.verifyAuth,
  orderController.updateOrder
);

export default router;
