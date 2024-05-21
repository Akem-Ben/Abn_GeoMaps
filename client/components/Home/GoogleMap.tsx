"use client"
import { LocationContext } from '@/contexts/userLocationContext';
import { LoadScript, GoogleMap as Map, Marker } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';


const GoogleMap = (ranger:any) => {

  const {location, setLocation} = useContext(LocationContext)

    const containerStyle = {
        width: '100%',
        height: '80vh'
    }

    const [coordinate, setCoodrdinate] = useState(location)


  return (

    <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
            <Map mapContainerStyle={containerStyle} center={location} zoom={12}>
              <Marker position={location} />
            </Map>
        </LoadScript>
    </div>
  )
}

export default GoogleMap