import express from 'express';
import isAuth from '../middleware/is-auth';
import * as supportRequestController from '../controllers/srqController';
const router = express.Router();

router.get('/srq', isAuth, supportRequestController.getAllSupportRequests);
router.post('/srq', isAuth, supportRequestController.postAddSupportRequest);
router.patch('/srq/:srqId', isAuth, supportRequestController.updateSupportRequestById);
router.delete('/srq/:srqId', isAuth, supportRequestController.deleteSupportRequestById);

export default router;
