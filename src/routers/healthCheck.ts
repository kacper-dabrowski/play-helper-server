import express from 'express';
import { getHealthCheck } from '../controllers/healthCheckController';

const router = express.Router();

router.get('/healthcheck', getHealthCheck);

export default router;
