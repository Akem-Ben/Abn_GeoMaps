import mongoose from 'mongoose'
import { env } from 'process'


export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`)
            console.log(`Database connected`)
    }catch(err){
        console.log(err)
    }
}