import { Router, Request, Response } from "express";
import auth from "./auth";
// import invoice from "./invoice";

const routes = Router();

routes.use("/auth", auth);
// routes.use("/invoices", invoice);

export default routes;