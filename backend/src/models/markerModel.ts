import mongoose, {Schema} from 'mongoose'

export interface IMarker {
    _id: string,
    markerName: string,
    markerDisplayName: string,
    longitude: number,
    latitude: number,
}

const MarkerSchema = new Schema ({
    markerName: {
        type: String,
        require: [true, `Please input location name`]
    },
    markerDisplayName: {
        type: String,
        require: [true, `Please input the display name you want`]
    },
    longitude: {
        type: Number,
        require
    },
    latitude: {
        type: Number,
        require
    }
},
{
    timestamps: true
}
)

const Marker = mongoose.model<IMarker>('Markers', MarkerSchema)

export default Marker