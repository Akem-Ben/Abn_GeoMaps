import { connectDB } from '@/database/database';
import Marker from '../../../models/markerModel';
import { NextResponse } from 'next/server';

export const POST = async(request: { json: () => { markerName: any; longitude: any; latitude: any; }; }) => {
    try{
        const {markerName, longitude, latitude} = request.json()

        await connectDB()

        const checkMarker = await Marker.findOne({markerName, longitude, latitude})

        if(!checkMarker){
            let newMarker = await Marker.create({ markerName, longitude, latitude, markerDisplayName:markerName })

            const confirmNewaMarker = await Marker.findOne({markerName, longitude, latitude})

            if(confirmNewaMarker){

            return NextResponse.json({
                message: `Marker Successfully Created`,
                confirmNewaMarker
            }, {status: 200})
        }

        return NextResponse.json({
            message: `Unabe to add marker, Try again`,
        }, {status: 400})

        }

        return NextResponse.json({
            message: `Marker Already Exists`,
            checkMarker
        }, { status: 400})

    }catch (error:any) {
        if (error.response) {
          console.log('err1', error.response.data);
          return NextResponse.json({message: "Internal Server Error"}, {status: 500,})
        } else if (error.request) {
          console.log('err2',error.request);
          return NextResponse.json({ message: error.request }, {status: 400,})
        } else {
          console.log("Error", error.message);
          return NextResponse.json({message: error.request}, {status: 500,})
        }
      }
}