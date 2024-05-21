import mongoose from 'mongoose'
import { env } from 'process'


export const connectDB = async()=>{
    try{
        const conn = mongoose.connect("mongodb://localhost:27017/abn_geomaps")
            console.log(`MongoDB connected`)
    }catch(err){
        console.log(err)
    }
}