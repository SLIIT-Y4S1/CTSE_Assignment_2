import { productModel } from "./model";
import { Product } from "./utils/product.interface";

const getProducts = () => productModel.find();

const createProduct = (payload: Product) => productModel.create(payload);


export const service = {
  getProducts,
  createProduct,
};
