import winston from "winston";
import { initLogger } from "../utils/logger";
import { Request, Response } from "express";
import { productSchema } from "../schema";

const logger: winston.Logger = initLogger();

export const payloadValidator = (
  req: Request,
  res: Response,
  next: Function
) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    logger.error(error);
  } else {
    next();
  }
};
