import {
  getProducts,
  getMetrics,
  createProduct,
  deleteProductById,
  getProductById,
  updateProductById,
} from "./controller";
import { Router } from "express";

import { payloadValidator } from "./middleware/schema-validator";

const router = Router();

router.get("/", getProducts);

router.get("/metrics/get", getMetrics);

router.post("/", payloadValidator, createProduct);

router.delete("/:id", deleteProductById);

router.get("/:id", getProductById);

router.put("/:id", payloadValidator, updateProductById);

export default router;
