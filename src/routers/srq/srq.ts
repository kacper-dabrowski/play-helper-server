import express from 'express';
import isAuth from '../../middleware/is-auth';
import * as supportRequestController from '../../controllers/srqController';
const router = express.Router();

router.get('/srq', isAuth, supportRequestController.getAllSupportRequests);
router.put('/srq', isAuth, supportRequestController.putAddSupportRequest);
router.post('/srq/:srqId', isAuth, supportRequestController.updateSupportRequestById);
router.delete('/srq/:srqId', isAuth, supportRequestController.deleteSupportRequestById);

export default router;
