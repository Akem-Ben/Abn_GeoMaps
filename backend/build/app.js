"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//Database
// connectDB()
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/location', locationRoutes_1.default);
//Routes
// app.use('/admin', AdminRoutes)
app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});
exports.default = app;
