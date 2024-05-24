import Markers from "@/models/markerModel";
import { connectDB } from "@/database/database";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export type Params = {
  id: string;
};

connectDB();

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
    try{
      const Marker =
      mongoose.models.Markers || mongoose.model("Markers", Markers);

      const { id } = params;

        await Marker.findByIdAndDelete({_id:id})

        const confirmDelete = await Marker.findOne({_id:id})

        if(confirmDelete){
          return NextResponse.json(
            {
                status: 'error',
                message: `Unable To Delete, Please Try Again`,
            },
            { status: 400 }
          )
        }

        const returnmarkers = await Marker.find({});

        return NextResponse.json(
          {
            status: 'success',
            message: `Marker Deleted Successfully`,
            returnmarkers
        },
        { status: 200 }
      )

    }catch (error: any) {
      if (error.response) {
        console.log("err1", error.response.data);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      } else if (error.request) {
        console.log("err2", error.request);
        return NextResponse.json({ message: error.request }, { status: 400 });
      } else {
        console.log("Error", error.message);
        return NextResponse.json({ message: error.request }, { status: 500 });
      }
    }
}