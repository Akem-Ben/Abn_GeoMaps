"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../public/geo_logo.jpeg";
import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { showErrorToast } from "@/utilities/toastify";
import { getCoordinates } from "@/axios-setup/functions/functions";
import { InformationContext } from "@/contexts/informationContext";

const Navbar = () => {
  const { data: session } = useSession();

  const [fetchData, setFetchData] = useState('')
  const [loading, setLoading] = useState(false)

  const {setInfo, setShowModal} = useContext(InformationContext)

  const findLocation = async(e:any) => {
    
    try{
    e.preventDefault()
    setLoading(true)

    if(fetchData === ""){
      setLoading(false)
      return showErrorToast('Address Required')
    }

    const dataHolder:any = await getCoordinates(fetchData)

    if(dataHolder.status !== 200){
      setLoading(false)
      return showErrorToast(dataHolder.data.message)
    }

    setInfo(dataHolder.data.data)

    setFetchData('')

    setShowModal(true)

    setLoading(false)

    return

    }catch (error:any) {
      if (error.response) {
        console.log(error.response.data);
        return showErrorToast("Internal Server Error")
      } else if (error.request) {
        console.log(error.request);
        return showErrorToast(error.request)
      } else {
        console.log("Error", error.message);
        return showErrorToast(error.request)
      }
    }
  };
  return (
    <div className="px-1 py-1 bg-white shadow-lg w-full">
      <div className="flex justify-between items-center">
        <section className="flex w-[20%] justify-between">
          <div>
            <Image
              src={logo}
              alt="logo"
              className="rounded-xl w-[80px] h-[80px]"
            />
          </div>
          <div className="w-[60%] items-center flex">
            <ul className="flex w-full justify-between">
              <li className="hover:text-green-700 hover:cursor-pointer font-medium">
                Home
              </li>
              <li className="hover:text-green-700 hover:cursor-pointer font-medium">
                Favourites
              </li>
            </ul>
          </div>
        </section>
        <section className=" px-2 py-2 flex w-[50%] gap-6">
          <div className="border bg-gray-100 p-2 w-[70%] flex rounded-lg gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 mt-2 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              placeholder="Search and Add a Location Marker"
              required
              value={fetchData}
              onChange={(e)=> setFetchData(e.target.value)}
              className="text-green-700 bg-transparent w-full text-medium p-1 outline-none"
            />
          </div>
          <button className="border-2 rounded-lg p-3 bg-green-700 text-white hover:bg-white hover:text-green-700" onClick={findLocation}>
            {loading ? 'Searching...' : 'Search for Location'}
          </button>
        </section>
        <section>
          {session?.user ? (
            <Image src={session.user.image!} alt="user profile picture" width={40} height={40} className="rounded-full"/>
          ) : (
            <CgProfile className="w-[50px] h-[50px]" />
          )}
        </section>
      </div>
    </div>
  );
};

export default Navbar;
