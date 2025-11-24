import { ObjectId } from "mongoose";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import orderItemModel from "../schema/orderItem.model";
import { Order, OrderItemInput } from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import logger from "../libs/logger";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = orderItemModel;
  }

  //   createOrder
  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    logger.info(input);
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce((acc: number, item: OrderItemInput) => {
      return acc + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      });

      const orderId = newOrder._id;
      logger.info("orderID", newOrder._id);

      await this.recordOrderItem(orderId, input);
      //   todo create order item
      return newOrder;
    } catch (err) {
      logger.error("ERROR, model:createdOrder", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[]
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    logger.info("promisedList:", promisedList);
    const orderItemsState = await Promise.all(promisedList);
    logger.info("orderItemsState:", orderItemsState);
  }
}

export default OrderService;
