import { connectDB } from "@/database/database";
import Markers from "@/models/markerModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const Marker =
      mongoose.models.Markers || mongoose.model("Markers", Markers);
    const { markerName, longitude, latitude } = await request.json();

    if (!markerName || !longitude || !latitude) {
      return NextResponse.json(
        {
          message: `Please input all fields`,
        },
        { status: 400 }
      );
    }

    const checkMarker = await Marker.findOne({
      longitude,
      latitude,
      markerName,
    });

    if (!checkMarker) {
      let newMarker = await Marker.create({
        markerName: markerName,
        longitude: longitude,
        latitude: latitude,
        markerDisplayName: markerName,
      });

      const confirmNewaMarker = await Marker.findOne({
        markerName,
        longitude,
        latitude,
      });

      if (confirmNewaMarker) {
        return NextResponse.json(
          {
            message: `Marker Successfully Created`,
            confirmNewaMarker,
            checkMarker,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          message: `Unabe to add marker, Try again`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: `Marker Already Exists`,
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
