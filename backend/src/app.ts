import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './configurations/database';
import locationRoutes from './routes/locationRoutes';
import cors from 'cors';

const app = express()

dotenv.config()

//Database
connectDB()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(logger('dev'))
app.use('/location', locationRoutes)

//Routes
// app.use('/admin', AdminRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`)
})

export default app;
