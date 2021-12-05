import express from 'express';
import * as authController from '../../controllers/authController';
import { loginSchema, registrationValidationSchema } from '../../modules/validation/schemas';
import { validateBodyWithSchema } from '../../modules/validation/validation';

const router = express.Router();

router.post('/signup', validateBodyWithSchema(registrationValidationSchema), authController.postAddUser);
router.post('/login', validateBodyWithSchema(loginSchema), authController.loginUser);

export default router;
