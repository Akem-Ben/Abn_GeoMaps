import express from 'express';
import { findLocation } from '../controllers/findLocation';
import { addMarker } from '../controllers/saveMarker';
import { getAllMarkers } from '../controllers/getMarkers';
import { getSingleMarker } from '../controllers/getSingleMarker';
import { editMarker } from '../controllers/editMarkerTitle';

const router = express.Router()

router.get('/find', findLocation)
router.post('/save', addMarker)
router.get('/allmarkers', getAllMarkers)
router.get('/singlemarker/:_id', getSingleMarker)
router.patch('/edit/:_id', editMarker)



export default router;