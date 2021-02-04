import express from "express";
import * as solutionController from "../controllers/solutionController";
const router = express.Router();

router.put("/solutions", solutionController.putAddSolution);
router.get("/solutions", solutionController.getSolutions);
router.post("/solutions/:id", solutionController.postUpdateSolution);
router.delete("/solutions/:solutionId", solutionController.deleteSolutionById);

export default router;
