import { productModel } from "./model";
import { Product } from "./utils/product.interface";

const getProducts = () => productModel.find();

const createProduct = (payload: Product) => productModel.create(payload);

const getProductById = (id: string) => productModel.findById(id);

const updateProductById = (id: string, payload: Product) =>
  productModel.findByIdAndUpdate(id, payload, { new: true });

const deleteProductById = (id: string) =>
  productModel.findOneAndDelete({ _id: id });

export const service = {
  getProducts,
  createProduct,
  deleteProductById,
  getProductById,
  updateProductById
};
