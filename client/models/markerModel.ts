import { Schema } from "mongoose";

export interface IMarker {
  _id: string;
  markerName: string;
  markerDisplayName: string;
  longitude: number;
  latitude: number;
}

const Markers = new Schema<IMarker>(
  {
    markerName: {
      type: String,
    },
    markerDisplayName: {
      type: String,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default Markers;
