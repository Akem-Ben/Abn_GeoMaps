import { NextResponse } from "next/server";
import Markers from "../../../models/markerModel";
import { connectDB } from "../../../database/database";
import mongoose from "mongoose";

connectDB();

export const GET = async () => {
  try {
    const Marker =
      mongoose.models.Markers || mongoose.model("Markers", Markers);

    const markers: any = await Marker.find({});

    let finalMarkers = markers.sort(
      (a: any, b: any) => b.updatedAt - a.updatedAt
    );

    return NextResponse.json({
      status: "success",
      message: "All Markers fetched successfully",
      finalMarkers,
    });
  } catch (error: any) {
    console.log("error", error);
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
