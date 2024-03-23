import { Request, Response } from "express";
import {
  createTestService,
  findTestService,
  listTestService,
} from "./../service/test.service";
import { CreateTestInput, GetTestInput } from "../schema/test.schema";

import logger from "../utils/logger";

export const createTestHandler = async (
  req: Request<{}, {}, CreateTestInput["body"]>,
  res: Response
) => {
  const body = req.body;
  try {
    const test = await createTestService({ ...body });
    return res.status(201).send(test);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export const getTestHandler = async (
  req: Request<GetTestInput["params"], {}, {}>,
  res: Response
) => {
  try {
    const { testId } = req.params;
    const test = await findTestService(testId);
    return res.send(test);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export const getTestListHandler = async (req: Request, res: Response) => {
  try {
    const testList = await listTestService();
    return res.send(testList);
  } catch (error: any) {
    logger.error(error);
    return res
      .status(400)
      .send("An error occurred while fetching the test list");
  }
};
