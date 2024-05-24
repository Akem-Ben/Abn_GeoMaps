import { NextResponse, NextRequest } from "next/server";
import Markers from "@/models/markerModel";
import { connectDB } from "@/database/database";
import mongoose from "mongoose";

export type Params = {
  id: string;
};

connectDB();

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const Marker =
      mongoose.models.Markers || mongoose.model("Markers", Markers);
    const { id } = params;

    const marker = await Marker.findOne({ _id: id });

    if (marker) {
      return NextResponse.json(
        {
          message: "Marker found successfully",
          marker,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Marker not found",
      },
      { status: 404 }
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
