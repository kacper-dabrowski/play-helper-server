import express from 'express';
import * as solutionController from '../../controllers/solutionController';
import isAuth from '../../middleware/is-auth';
import { solutionValidationSchema } from '../../modules/validation/schemas';
import { validateBodyWithSchema } from '../../modules/validation/validation';

const router = express.Router();

router.get('/solutions', isAuth, solutionController.getSolutions);
router.put('/solutions', isAuth, validateBodyWithSchema(solutionValidationSchema), solutionController.putAddSolution);
router.post('/solutions/:solutionId', isAuth, solutionController.postUpdateSolution);
router.delete('/solutions/:solutionId', isAuth, solutionController.deleteSolutionById);

export default router;
