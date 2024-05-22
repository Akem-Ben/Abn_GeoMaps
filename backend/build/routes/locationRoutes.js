"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findLocation_1 = require("../controllers/findLocation");
const saveMarker_1 = require("../controllers/saveMarker");
const getMarkers_1 = require("../controllers/getMarkers");
const getSingleMarker_1 = require("../controllers/getSingleMarker");
const editMarkerTitle_1 = require("../controllers/editMarkerTitle");
const router = express_1.default.Router();
router.get('/find', findLocation_1.findLocation);
router.post('/save', saveMarker_1.addMarker);
router.get('/allmarkers', getMarkers_1.getAllMarkers);
router.get('/singlemarker/:_id', getSingleMarker_1.getSingleMarker);
router.patch('/edit/:_id', editMarkerTitle_1.editMarker);
exports.default = router;
