import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
const productController: T = {};

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
productController.createNewProduct = (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
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
