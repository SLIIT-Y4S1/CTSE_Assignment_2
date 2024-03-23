import { Router } from "express";
const router = Router();

import {
  createTestHandler,
  getTestHandler,
} from "../controller/test.controller";
import validate from "../middleware/validateResource";
import { createTestSchema, getTestSchema } from "../schema/test.schema";

router.post("/", validate(createTestSchema), createTestHandler);

router.get("/:testId", validate(getTestSchema), getTestHandler);

export default router;
