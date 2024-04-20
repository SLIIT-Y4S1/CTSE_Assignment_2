import {
  getProducts,
  getMetrics,
  createProduct,
  deleteProductById,
} from "./controller";
import { Router } from "express";

import { payloadValidator } from "./middleware/schema-validator";

const router = Router();

router.get("/", getProducts);

router.get("/metrics/get", getMetrics);

router.post("/", payloadValidator, createProduct);

router.delete("/:id", deleteProductById);

export default router;
