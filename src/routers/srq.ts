import express from "express";
import * as supportRequestController from "../controllers/srqController";
const router = express.Router();

router.get("/srq", supportRequestController.getAllSupportRequests);
router.post("/srq", supportRequestController.postAddSupportRequest);
router.patch("/srq/:srqId", supportRequestController.updateSupportRequestById);
router.delete("/srq/:srqId", supportRequestController.deleteSupportRequestById);

export default router;
