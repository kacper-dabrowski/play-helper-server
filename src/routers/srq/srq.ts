import express from 'express';
import isAuth from '../../middleware/is-auth';
import * as supportRequestController from '../../controllers/srqController';
import { validateBodyWithSchema } from '../../modules/validation/validation';
import { supportRequestSchema } from '../../modules/validation/schemas';
const router = express.Router();

router.get('/srq', isAuth, supportRequestController.getAllSupportRequests);
router.put('/srq', isAuth, validateBodyWithSchema(supportRequestSchema), supportRequestController.putAddSupportRequest);
router.post(
    '/srq/:srqId',
    isAuth,
    validateBodyWithSchema(supportRequestSchema),
    supportRequestController.updateSupportRequestById
);
router.delete('/srq/:srqId', isAuth, supportRequestController.deleteSupportRequestById);

export default router;
