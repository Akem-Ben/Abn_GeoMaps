"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiGetRequests = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const makeApiGetRequests = async (httpMethod, resourceUrl) => {
    const response = await (0, axios_1.default)({
        method: httpMethod,
        url: resourceUrl,
    });
    return response;
};
exports.makeApiGetRequests = makeApiGetRequests;
// export const makeApiGetRequests = async (httpMethod: string, resourceUrl: string, headers?: any, params?:any, info?:any) => {
//     const response = await axios({
//         method: httpMethod,
//         url: resourceUrl,
//         headers: headers,
//         params: params,
//         data: info
//       })
//       return response
// }
