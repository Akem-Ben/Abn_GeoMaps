"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMarker = void 0;
const markerModel_1 = __importDefault(require("../models/markerModel"));
const editMarker = async (request, response) => {
    try {
        const { title } = request.body;
        console.log(request.body.title);
        const id = request.params._id;
        await markerModel_1.default.updateOne({ _id: id }, { $set: { markerDisplayName: title } });
        const checkMarker = await markerModel_1.default.findOne({ _id: id });
        if (checkMarker.markerDisplayName === title) {
            return response.status(200).json({
                status: 'success',
                message: `Title successfully updated`,
                checkMarker
            });
        }
        return response.status(400).json({
            status: 'error',
            message: `Unable to update, try again`,
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
exports.editMarker = editMarker;
