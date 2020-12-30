import express from "express";
import { NotFoundController } from "../controllers/notFoundController";

const router = express.Router();

router.use(NotFoundController);

export default router;
