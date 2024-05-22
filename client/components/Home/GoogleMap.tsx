"use client"
import { MarkerContext } from '@/contexts/markerContext';
import { LocationContext } from '@/contexts/userLocationContext';
import { LoadScript, GoogleMap as Map, Marker, MarkerClusterer } from '@react-google-maps/api';
import React, { useContext } from 'react';

const GoogleMap = (ranger:any) => {

  const {location} = useContext(LocationContext)

  const {markers} = useContext(MarkerContext)

    const containerStyle = {
        width: '100%',
        height: '80vh'
    }
  return (


    <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
            <Map mapContainerStyle={containerStyle} center={location} zoom={10}>
              <Marker position={location}/>
              <MarkerClusterer>
            {(clusterer) =>
              markers.map((item:any, index:number) => (
                <Marker key={index} position={{ lat: item.latitude, lng: item.longitude }} clusterer={clusterer} />
              ))
            }
          </MarkerClusterer>
            </Map>
        </LoadScript>
    </div>
  )
}

export default GoogleMap