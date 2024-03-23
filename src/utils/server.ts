import express from "express";
import routes from "../routes";
import cors from "cors";
import morgan from "morgan";
function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(morgan("common"));

  routes(app);

  return app;
}

export default createServer;
