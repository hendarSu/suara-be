import { Router } from "express";
import ReportInvoiceController from "../controllers/ReportInvoiceController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
router.get("/", [checkJwt], ReportInvoiceController.listAll);
router.get("/:id", [checkJwt], ReportInvoiceController.getDetail);
router.get("/:id/html", [checkJwt], ReportInvoiceController.getHtml);

export default router;