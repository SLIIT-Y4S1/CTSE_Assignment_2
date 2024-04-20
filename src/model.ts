import { Schema, model } from "mongoose";
import { Product } from "./utils/product.interface";

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      required: true,
    },
    reorderLevel: {
      type: Number,
      required: true,
    },
  },
  { optimisticConcurrency: true }
);

export const productModel = model<Product>("products", productSchema);
