import mongoose from "mongoose";
import { initLogger } from "./src/utils/logger";
import winston from "winston";
import { app } from "./src/utils/app";
import "dotenv/config";

const logger: winston.Logger = initLogger();

app.listen(process.env.PORT, async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`);
    logger.info(
      `Connected to database. Server available at http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    logger.error(error);
  }
});
