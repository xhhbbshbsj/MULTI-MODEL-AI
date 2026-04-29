import express from 'express';
import multer from 'multer';
import { handleEngineRequest } from '../controllers/aiController.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/process', upload.single('file'), handleEngineRequest);

export default router;