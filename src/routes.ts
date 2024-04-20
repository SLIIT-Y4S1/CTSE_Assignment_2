import { getProducts, getMetrics } from "./controller";
import { Router } from "express";

const router = Router();

router.get("/health-check", (req, res) => res.sendStatus(200));

router.get("/", getProducts);

router.get("/metrics/get", getMetrics);

export default router;
