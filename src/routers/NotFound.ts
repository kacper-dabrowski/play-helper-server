import express from "express";
import { NotFoundController } from "../controllers/notFound";

const router = express.Router();

router.use("*", NotFoundController);

export default router;
