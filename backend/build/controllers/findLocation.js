"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLocation = void 0;
const axios_1 = require("../axios");
const findLocation = async (request, response) => {
    try {
        const address = request.query.location;
        if (!address || address === '') {
            return response.status(400).json({ message: 'Address is required' });
        }
        const url = `${process.env.API_URL}/search?q=${address}&api_key=${process.env.API_KEY}`;
        const addressFinder = await (0, axios_1.makeApiGetRequests)('GET', url);
        if (addressFinder.length === 0) {
            return response.status(404).json({
                status: `error`,
                message: `Address not found, you can tweak the spellings and try again`
            });
        }
        return response.status(200).json({ status: 'Success', message: `Location found Successfully`, data: addressFinder });
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
exports.findLocation = findLocation;
