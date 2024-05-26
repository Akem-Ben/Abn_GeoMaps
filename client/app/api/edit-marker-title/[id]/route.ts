import { connectDB } from "@/database/database";
import Markers from "../../../../models/markerModel";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

connectDB();

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const Marker =
      mongoose.models.Markers || mongoose.model("Markers", Markers);

    const { title } = await request.json();

    const { id } = params;

    await Marker.updateOne({ _id: id }, { $set: { markerDisplayName: title } });

    const checkMarker: any = await Marker.findOne({ _id: id });

    if (checkMarker.markerDisplayName === title) {
      return NextResponse.json(
        {
          message: `Title successfully updated`,
          checkMarker,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: `Unable to update, try again`,
        checkMarker,
      },
      { status: 400 }
    );
  } catch (error: any) {
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
};
