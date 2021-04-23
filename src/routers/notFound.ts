import express from 'express';
import { notFoundController } from '../controllers/notFoundController';

const router = express.Router();

router.use(notFoundController);

export default router;
