import {Request, Response} from 'express';
import Marker from '../models/markerModel';

export const getSingleMarker = async(request:Request, response:Response)=>{
    try{
        const id = request.params._id

        const marker = await Marker.findOne({_id:id})

        if(marker){
            return response.status(200).json({
                status: 'success',
                message: "Marker found successfully",
                marker
            })
        }

        return response.status(400).json({
            status: 'error',
            message: "Marker not found"
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