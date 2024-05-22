"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMarkers = void 0;
const markerModel_1 = __importDefault(require("../models/markerModel"));
const getAllMarkers = async (request, response) => {
    try {
        const markers = await markerModel_1.default.find({});
        let finalMarkers = markers.sort((a, b) => b.updatedAt - a.updatedAt);
        return response.status(200).json({
            status: 'success',
            message: "All Markers fetched successfully",
            markers,
            finalMarkers
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
exports.getAllMarkers = getAllMarkers;
