"use client";
import GoogleMap from "@/components/Home/GoogleMap";
import Markers from "@/components/Home/Markers";
import RangeSelector from "@/components/Home/RangeSelector";
import Navbar from "@/components/Navbar";
import { MarkerContext } from "@/contexts/markerContext";
import { useContext } from "react";


const Home = () => {

const {markers, setMarkers} = useContext(MarkerContext)

return (
<div className="flex flex-col">
    <Navbar />
  <div className="grid grid-cols-4 flex-col">
    <div>
      <div className="bg-gray-100 flex justify-center text-green-700 mt-2 border">
        Favourites {markers.length > 0 ? '😊' : '😢'}
      </div>
      {markers.length > 0 ? (
        <div className="h-[500px] bg-gray-100 overflow-y-scroll px-2 py-4 flex gap-4 flex-wrap justify-center items-start">
          {markers.map((data: any, index: number) => (
            <Markers
            key={index}
            markerDisplayName={data.markerDisplayName}
            latitude={data.latitude}
            longitude={data.longitude}
            id={data._id}
            markerName={data.markerName}
          />
          ))}
        </div>
      ) : (
        <p className="mt-4 p-2 flex items-center justify-center">No favourite locations added yet 😢</p>
      )}
      <div className="p-3">
        <RangeSelector />
      </div>
    </div>
    <div className="bg-gray-300 col-span-3 h-screen px-2 py-6">
      <GoogleMap />
    </div>
  </div>
  </div>
);

}

export default Home;