import ProductService from "../model/Product.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { ReqAdmin } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";

const productController: T = {};

const productService = new ProductService();

// getAllProducts
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProduct");
    const data = await productService.getAllProducts();
    res.render("products", { products: data });
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
    await productService.createNewProduct(data);
    res.send(
      `<script> alert("Product created successfully"); window.location.replace('/admin/product/all'); </script>`
    );
  } catch (err) {
    console.log("Error createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all'); </script>`
    );
  }
};

// updateChosenProduct
productController.updateChosenProduct = async (req: Request, res: Response) => {
  console.log("updateChosenProduct");

  try {
    const id = req.params.id;
    const result = await productService.updateChosenProduct(id, req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
export default productController;
