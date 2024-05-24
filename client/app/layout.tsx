"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "./Provider";
import { useEffect, useState } from "react";
import { LocationContext } from "../contexts/userLocationContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Modal } from "@/components/Modal/Modal";
import { InformationContext } from "@/contexts/informationContext";
import { showErrorToast, showSuccessToast } from "@/utilities/toastify";
import { MarkerContext } from "@/contexts/markerContext";
import { getAllMarkers, saveMarkers } from "@/axios-setup/functions/functions";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [location, setLocation] = useState<any>([]);

  const [showModal, setShowModal] = useState(false);

  const [info, setInfo] = useState<any>([]);

  const [markerData, setMarkerData] = useState<any>([]);

  const [markers, setMarkers] = useState<any>([]);

  const [ranger, setRanger] = useState(10)

  const allUserMarkers = async () => {
    try {
      const response = await getAllMarkers();

      console.log('res', response)

      setMarkers(response.data.finalMarkers);
    } catch (error: any) {
      console.log(error);
    }
  };

  const addMarker = async (e: any, data: any) => {
    try {
      e.preventDefault();
      const body = {
        markerName: data.display_name,
        longitude: Number(data.lon),
        latitude: Number(data.lat),
      };
      const response = await saveMarkers(body);

      if (response.status !== 200) {
        setShowModal(false);
        return showErrorToast(response.data.message);
      }

      allUserMarkers();

      setLocation({ lat: Number(data.lat), lng: Number(data.lon) });
      setShowModal(false);
      showSuccessToast(response.data.message);
      return setMarkerData(data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        return showErrorToast("Internal Server Error");
      } else if (error.request) {
        console.log(error.request);
        return showErrorToast(error.request);
      } else {
        console.log("Error", error.message);
        return showErrorToast(error.request);
      }
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  useEffect(() => {
    getUserLocation();
    allUserMarkers();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ToastContainer />
          <InformationContext.Provider value={{ info, setInfo, setShowModal }}>
            <LocationContext.Provider value={{ location, setLocation, ranger, setRanger }}>
              <MarkerContext.Provider
                value={{
                  markerData,
                  setMarkerData,
                  markers,
                  setMarkers,
                  allUserMarkers,
                }}
              >
                {/* <Navbar /> */}
                {children}
              </MarkerContext.Provider>
            </LocationContext.Provider>
          </InformationContext.Provider>
        </Provider>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="bg-gray-200 w-full mb-3 h-[400px] overflow-y-scroll p-4">
              <div className="text-green-800 flex justify-center font-bold">
                Look what we found
              </div>
              <div>
                {info &&
                  info.map((data: any, index: number) => (
                    <div
                      key={index}
                      className="flex bg-gray-400 items-center justify-between p-3 mb-2 border rounded-lg"
                    >
                      <div className="w-[70%] flex">{data.display_name}</div>
                      <button
                        onClick={()=> {setLocation({lat: Number(data.lat), lng: Number(data.lon)}), setShowModal(false)}}
                        className="rounded-lg p-2 bg-green-700 h-[50px] text-white hover:bg-white hover:text-green-700 border"
                      >
                        View
                      </button>
                      <button
                        onClick={(e: any) => addMarker(e, data)}
                        className="rounded-lg p-2 bg-green-700 h-[50px] text-white hover:bg-white hover:text-green-700 border"
                      >
                        Add Marker
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </Modal>
        )}
      </body>
    </html>
  );
}
