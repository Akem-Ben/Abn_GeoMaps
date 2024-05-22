import {Request, Response} from 'express';
import Marker from '../models/markerModel';

export const addMarker = async(request:Request,response:Response) => {
    try{
        const {markerName, longitude, latitude} = request.body

        const checkMarker = await Marker.findOne({markerName, longitude, latitude})

        if(!checkMarker){
            let newMarker = await Marker.create({ markerName, longitude, latitude, markerDisplayName:markerName })

            const confirmNewaMarker = await Marker.findOne({markerName, longitude, latitude})

            if(confirmNewaMarker){

            return response.status(200).json({
                status: 'success',
                message: `Marker Successfully Created`,
                confirmNewaMarker
            })
        }

        return response.status(400).json({
            status: 'error',
            message: `Unabe to add marker, Try again`,
        })

        }

        return response.status(400).json({
            status: 'error',
            message: `Marker Already Exists`,
            checkMarker
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