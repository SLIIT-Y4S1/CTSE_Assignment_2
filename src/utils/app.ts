import express, { Application } from "express";
import routes from "../routes";

export const app: Application = express();

app.use(express.json());
app.get("/health-check", (req, res) => res.sendStatus(200));
app.use("/api/v1", routes);
