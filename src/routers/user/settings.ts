import express from 'express';
import isAuth from '../../middleware/is-auth';
import * as settingsController from '../../controllers/settingsController';
import { validateBodyWithSchema } from '../../modules/validation/validation';
import { settingsUpdateSchema } from '../../modules/validation/schemas';

const router = express.Router();

router.post(
    '/user/settings',
    isAuth,
    validateBodyWithSchema(settingsUpdateSchema),
    settingsController.postEditSettings
);
router.get('/user/settings', isAuth, settingsController.getUser);

export default router;
