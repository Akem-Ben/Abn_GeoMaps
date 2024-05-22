import {Request, Response} from 'express';
import Marker from '../models/markerModel';

export const editMarker = async(request:Request,response:Response) => {
    try{
        const {title} = request.body

        console.log(request.body.title)

        const id = request.params._id

        await Marker.updateOne({ _id: id }, { $set: { markerDisplayName: title } });
        
        const checkMarker:any = await Marker.findOne({_id:id})
        
        if(checkMarker.markerDisplayName === title){
          return response.status(200).json({
            status: 'success',
            message: `Title successfully updated`,
            checkMarker
          })
        }
        return response.status(400).json({
            status: 'error',
            message: `Unable to update, try again`,
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