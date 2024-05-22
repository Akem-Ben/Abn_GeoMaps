"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMarker = void 0;
const markerModel_1 = __importDefault(require("../models/markerModel"));
const addMarker = async (request, response) => {
    try {
        const { markerName, longitude, latitude } = request.body;
        const checkMarker = await markerModel_1.default.findOne({ markerName, longitude, latitude });
        if (!checkMarker) {
            let newMarker = await markerModel_1.default.create({ markerName, longitude, latitude, markerDisplayName: markerName });
            const confirmNewaMarker = await markerModel_1.default.findOne({ markerName, longitude, latitude });
            if (confirmNewaMarker) {
                return response.status(200).json({
                    status: 'success',
                    message: `Marker Successfully Created`,
                    confirmNewaMarker
                });
            }
            return response.status(400).json({
                status: 'error',
                message: `Unabe to add marker, Try again`,
            });
        }
        return response.status(400).json({
            status: 'error',
            message: `Marker Already Exists`,
            checkMarker
        });
    }
    catch (error) {
        if (error.response) {
            console.log('err1', error.response.data);
            return response.status(500).json({ status: 'Error', message: "Internal Server Error" });
        }
        else if (error.request) {
            console.log('err2', error.request);
            return response.status(400).json({ status: 'Request error', message: error.request });
        }
        else {
            console.log("Error", error.message);
            return response.status(500).json({ status: 'Error', message: error.request });
        }
    }
};
exports.addMarker = addMarker;
