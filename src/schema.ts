import Joi from "joi";
import { Product } from "./utils/product.interface";

export const productSchema = Joi.object<Product>({
  name: Joi.string().required(),
  category: Joi.string().required(),
  unitPrice: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
  unitOfMeasure: Joi.string().required(),
  reorderLevel: Joi.number().positive().required(),
});
