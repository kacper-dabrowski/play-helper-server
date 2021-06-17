import express from 'express';
import isAuth from '../../middleware/is-auth';
import * as settingsController from '../../controllers/settingsController';
const router = express.Router();

router.post('/user/settings', isAuth, settingsController.postEditSettings);
router.get('/user/settings', isAuth, settingsController.getUser);

export default router;
