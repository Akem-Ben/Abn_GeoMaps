import express from 'express';
import { findLocation } from '../controllers/findLocation';
import { addMarker } from '../controllers/saveMarker';
import { getAllMarkers } from '../controllers/getMarkers';
import { getSingleMarker } from '../controllers/getSingleMarker';
import { editMarker } from '../controllers/editMarkerTitle';
import { deleteProduct } from '../controllers/deleteSingleMarker';

const router = express.Router()

router.get('/find', findLocation)
router.post('/save', addMarker)
router.get('/allmarkers', getAllMarkers)
router.get('/singlemarker/:_id', getSingleMarker)
router.patch('/edit/:_id', editMarker)
router.delete('/delete/:_id', deleteProduct)



export default router;