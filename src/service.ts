import { productModel } from "./model";

const getProducts = () => productModel.find();

export const service = {
  getProducts,
};
