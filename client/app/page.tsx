"use client";
import GoogleMap from "@/components/Home/GoogleMap";
import Markers from "@/components/Home/Markers";
import RangeSelector from "@/components/Home/RangeSelector";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
// const {data:session} = useSession();


// const router = useRouter()

// useEffect(()=>{
//   if(!session?.user){
//     router.push('/Login')
//   }
// },[session])
  return (
    <div className="grid grid-cols-4 flex-col">
      <div>
    <div className="h-[500px] bg-gray-100 overflow-y-scroll px-2 py-4 flex gap-4 flex-wrap justify-center items-start">
      <Markers />
      <Markers />
      <Markers />
      <Markers />
    </div>
    <div className="p-3">
      <RangeSelector />
    </div>
    </div>
    <div className="bg-gray-300 col-span-3 h-screen px-2 py-6">
      <GoogleMap />
    </div>
    </div>
  );
}

export default Home;