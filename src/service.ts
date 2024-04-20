import { productModel } from "./model";
import { Product } from "./utils/product.interface";

const getProducts = () => productModel.find();

const createProduct = (payload: Product) => productModel.create(payload);

const deleteProductById = (id: string) =>
  productModel.findOneAndDelete({ _id: id });

export const service = {
  getProducts,
  createProduct,
  deleteProductById,
};
