import express from 'express';
import { findLocation } from '../controllers/findLocation';

const router = express.Router()

router.get('/find', findLocation)


export default router;