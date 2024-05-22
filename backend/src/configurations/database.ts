import mongoose from 'mongoose'
import { env } from 'process'


export const connectDB = async()=>{
    try{
        const conn = mongoose.connect("mongodb+srv://andaobong:8RhWB1aDgVSAtdr2@cluster0.twfwc1c.mongodb.net/abn_geomaps")
            console.log(`MongoDB connected`)
    }catch(err){
        console.log(err)
    }
}