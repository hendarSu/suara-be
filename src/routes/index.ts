import { Router, Request, Response } from "express";
import auth from "./auth";
import register from "./register";
// import invoice from "./invoice";

const routes = Router();

routes.use("/auth", auth);
routes.use("/register", register);

export default routes;