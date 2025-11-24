import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Errors";
import { Response, Request, json } from "express";
import OrderService from "../model/Order.service";
import logger from "../libs/logger";
import { OrderInquiry } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";

const orderController: T = {};
const orderService = new OrderService();

// createOrder
orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    logger.info("createOrder");
    const result = await orderService.createOrder(req.member, req.body);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    logger.error("Error createOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// getMyOrders
orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    logger.info("getMyOrders");
    const { page, limit, orderStatus } = req.query;

    const inquiry: OrderInquiry = {
      page: Number(page),
      limit: Number(limit),
      orderStatus: orderStatus as OrderStatus,
    };

    const result = await orderService.getMyOrders(req.member, inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    logger.error("Error createOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default orderController;
