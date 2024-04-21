import winston from "winston";
import { initLogger } from "../utils/logger";
import { Request, Response } from "express";
import { productSchema } from "../schema";
import xss from "xss";

const logger: winston.Logger = initLogger();

export const payloadValidator = (
  req: Request,
  res: Response,
  next: Function
) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    res.status(400).send(xss(error.details[0].message));
    logger.error(error);
  } else {
    next();
  }
};
