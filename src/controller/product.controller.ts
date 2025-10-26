import ProductService from "../model/Product.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { ReqAdmin } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
const productController: T = {};

const productService = new ProductService();

// getAllProducts
productController.getAllProducts = (req: Request, res: Response) => {
  try {
    console.log("getAllProduct");
    res.render("product");
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// createNewProduct
productController.createNewProduct = async (req: ReqAdmin, res: Response) => {
  try {
    console.log("createNewProduct");
    if (!req.files.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => ele.path.replace(/\\/g, "/"));
    console.log("data", data);
    await productService.createNewProduct(data);
    res.send(
      `<script> alert("Succesful creation!"); window.location.replace('admin/product/all) </script>`
    );
  } catch (err) {
    console.log("Error createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/product/all) </script>`
    );
  }
};

// updateChosenProduct
productController.updateChosenProduct = (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
