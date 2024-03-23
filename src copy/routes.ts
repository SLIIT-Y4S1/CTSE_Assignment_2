import { Express, Request, Response } from "express";

import testRoutes from "../src/routes/test.routes";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use("/api/v1/test", testRoutes);
}

export default routes;
