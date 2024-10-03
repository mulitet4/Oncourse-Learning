import express from 'express';
import { getPatients } from '../controllers/patients.js';

const router = express.Router();

router.get('/', getPatients);

export default router;
