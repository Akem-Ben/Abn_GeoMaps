import {Request, Response} from 'express';
import Marker from '../models/markerModel';


export const getAllMarkers = async(request:Request,response:Response)=>{
    try{
        const markers:any = await Marker.find({})

        let finalMarkers = markers.sort((a:any,b:any)=> b.updatedAt - a.updatedAt)

        return response.status(200).json({
            status: 'success',
            message: "All Markers fetched successfully",
            markers,
            finalMarkers
        })

    }catch (error:any) {
        if (error.response) {
          console.log('err1', error.response.data);
          return response.status(500).json({status: 'Error', message: "Internal Server Error"})
        } else if (error.request) {
          console.log('err2',error.request);
          return response.status(400).json({status: 'Request error', message: error.request})
        } else {
          console.log("Error", error.message);
          return response.status(500).json({status: 'Error', message: error.request})
        }
      }
}