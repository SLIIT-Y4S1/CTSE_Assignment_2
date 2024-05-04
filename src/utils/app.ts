import express, { Application, Request, Response } from "express";
import routes from "../routes";

export const app: Application = express();

app.use(express.json());
app.get("/health-check", (req, res) => res.sendStatus(200));
// This route is used to crash the server for demostration purposes 
app.get("/crash", () => process.exit(1));
app.use("/api/v1", routes);

app.get("/hello-world", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World!" })
});
