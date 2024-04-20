import { getProducts, getMetrics, createProduct } from "./controller";
import { Router } from "express";

import { payloadValidator } from "./middleware/schema-validator";

const router = Router();

router.get("/health-check", (req, res) => res.sendStatus(200));

router.get("/", getProducts);

router.get("/metrics/get", getMetrics);

router.post("/", payloadValidator, createProduct);

export default router;
