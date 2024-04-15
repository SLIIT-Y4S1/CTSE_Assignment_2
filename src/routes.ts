import { Express, Request, Response } from "express";

import testRoutes from "./routes/test.routes";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use("/api/v1/test", testRoutes);
  app.get("/api/v1/test-2", (req: Request, res: Response) =>
    res.send("Test-2 working")
  );
}

export default routes;
