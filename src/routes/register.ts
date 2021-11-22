import { Router } from "express";
import { RegisterController } from "../controllers/RegisterController";


const router = Router();
//Login route
router.post("/", RegisterController.store);

export default router;